import { useRef, useState } from "react";

const POINTER_SWIPE_THRESHOLD = {
  mouse: 140,
  touch: 75,
  pen: 90,
  default: 90,
};
const WHEEL_SWIPE_THRESHOLD = 140;
const DESKTOP_BREAKPOINT = 768;

const isDesktopSwipeDisabledArea = (event) =>
  window.innerWidth > DESKTOP_BREAKPOINT &&
  event.target instanceof Element &&
  event.target.closest('[data-swipe-disabled="desktop"]');

export const usePortfolioNavigation = (slideCount) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pointerState = useRef({
    active: false,
    id: null,
    startX: 0,
    startY: 0,
    hasNavigated: false,
  });
  const wheelState = useRef({
    delta: 0,
    timeoutId: null,
    locked: false,
  });

  const showPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide > 0 ? prevSlide - 1 : slideCount - 1
    );
  };

  const showNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide < slideCount - 1 ? prevSlide + 1 : 0
    );
  };

  const resetPointerState = () => {
    pointerState.current = {
      active: false,
      id: null,
      startX: 0,
      startY: 0,
      hasNavigated: false,
    };
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerState.current = {
      active: true,
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      hasNavigated: false,
    };
  };

  const handlePointerMove = (event) => {
    if (
      !pointerState.current.active ||
      pointerState.current.id !== event.pointerId ||
      pointerState.current.hasNavigated ||
      isDesktopSwipeDisabledArea(event)
    ) {
      return;
    }

    const deltaX = event.clientX - pointerState.current.startX;
    const deltaY = event.clientY - pointerState.current.startY;
    const swipeThreshold =
      POINTER_SWIPE_THRESHOLD[event.pointerType] ??
      POINTER_SWIPE_THRESHOLD.default;

    if (
      Math.abs(deltaX) < swipeThreshold ||
      Math.abs(deltaX) <= Math.abs(deltaY) * 1.25
    ) {
      return;
    }

    pointerState.current.hasNavigated = true;

    if (deltaX > 0) {
      showPrevSlide();
      return;
    }

    showNextSlide();
  };

  const handleWheel = (event) => {
    if (isDesktopSwipeDisabledArea(event)) {
      return;
    }

    const isHorizontalIntent =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
      (event.shiftKey && Math.abs(event.deltaY) > 0);

    if (!isHorizontalIntent || wheelState.current.locked) {
      return;
    }

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    wheelState.current.delta += delta;

    if (wheelState.current.timeoutId) {
      clearTimeout(wheelState.current.timeoutId);
    }

    wheelState.current.timeoutId = setTimeout(() => {
      wheelState.current.delta = 0;
      wheelState.current.timeoutId = null;
    }, 180);

    if (Math.abs(wheelState.current.delta) < WHEEL_SWIPE_THRESHOLD) {
      return;
    }

    event.preventDefault();
    wheelState.current.locked = true;
    wheelState.current.delta = 0;

    if (delta < 0) {
      showPrevSlide();
    } else {
      showNextSlide();
    }

    setTimeout(() => {
      wheelState.current.locked = false;
    }, 450);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevSlide();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextSlide();
    }
  };

  return {
    currentSlide,
    setCurrentSlide,
    showPrevSlide,
    showNextSlide,
    swipeHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: resetPointerState,
      onPointerCancel: resetPointerState,
      onPointerLeave: resetPointerState,
      onWheel: handleWheel,
      onKeyDown: handleKeyDown,
    },
  };
};
