import { useRef, useState } from "react";

const POINTER_SWIPE_THRESHOLD = {
  mouse: 140,
  touch: 48,
  pen: 90,
  default: 90,
};
const DRAG_START_THRESHOLD_PX = 12;
const WHEEL_SWIPE_THRESHOLD = 140;
const DESKTOP_BREAKPOINT = 768;

const isSwipeDisabledArea = (event) =>
  window.innerWidth > DESKTOP_BREAKPOINT &&
  event.target instanceof Element &&
  event.target.closest('[data-swipe-disabled="desktop"]');

const isPortfolioControl = (event) =>
  event.target instanceof Element &&
  event.target.closest('[data-portfolio-control="true"]');

const isInteractiveElement = (event) =>
  event.target instanceof Element &&
  event.target.closest(
    'a, button, input, textarea, select, summary, [role="button"]'
  );

export const usePortfolioNavigation = (slideCount) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipeInteracting, setIsSwipeInteracting] = useState(false);
  const pointerState = useRef({
    active: false,
    id: null,
    startX: 0,
    startY: 0,
    pointerType: null,
    isDraggingHorizontally: false,
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
      pointerType: null,
      isDraggingHorizontally: false,
    };
    setDragOffset(0);
    setIsDragging(false);
    setIsSwipeInteracting(false);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (
      isPortfolioControl(event) ||
      isInteractiveElement(event) ||
      isSwipeDisabledArea(event)
    ) {
      resetPointerState();
      return;
    }

    pointerState.current = {
      active: true,
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      pointerType: event.pointerType,
      isDraggingHorizontally: false,
    };
    setIsSwipeInteracting(true);

    if (event.currentTarget?.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event) => {
    if (
      !pointerState.current.active ||
      pointerState.current.id !== event.pointerId ||
      isInteractiveElement(event) ||
      isPortfolioControl(event) ||
      isSwipeDisabledArea(event)
    ) {
      return;
    }

    const deltaX = event.clientX - pointerState.current.startX;
    const deltaY = event.clientY - pointerState.current.startY;
    const isTouchLike =
      pointerState.current.pointerType === "touch" ||
      pointerState.current.pointerType === "pen";

    if (isTouchLike) {
      if (!pointerState.current.isDraggingHorizontally) {
        if (
          Math.abs(deltaX) < DRAG_START_THRESHOLD_PX ||
          Math.abs(deltaX) <= Math.abs(deltaY)
        ) {
          return;
        }

        pointerState.current.isDraggingHorizontally = true;
        setIsDragging(true);
      }

      const isAtLeadingEdge = currentSlide === 0 && deltaX > 0;
      const isAtTrailingEdge = currentSlide === slideCount - 1 && deltaX < 0;
      const softenedDelta =
        isAtLeadingEdge || isAtTrailingEdge ? deltaX * 0.35 : deltaX;

      setDragOffset(softenedDelta);
      return;
    }

    const swipeThreshold =
      POINTER_SWIPE_THRESHOLD[event.pointerType] ??
      POINTER_SWIPE_THRESHOLD.default;

    if (
      Math.abs(deltaX) < swipeThreshold ||
      Math.abs(deltaX) <= Math.abs(deltaY) * 1.25
    ) {
      return;
    }

    if (deltaX > 0) {
      showPrevSlide();
      resetPointerState();
      return;
    }

    showNextSlide();
    resetPointerState();
  };

  const handlePointerRelease = (event) => {
    if (
      pointerState.current.active &&
      pointerState.current.id === event.pointerId &&
      event.currentTarget?.releasePointerCapture
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (pointerState.current.isDraggingHorizontally) {
      const deltaX = event.clientX - pointerState.current.startX;
      const swipeThreshold =
        POINTER_SWIPE_THRESHOLD[pointerState.current.pointerType] ??
        POINTER_SWIPE_THRESHOLD.default;

      if (Math.abs(deltaX) >= swipeThreshold) {
        if (deltaX > 0) {
          showPrevSlide();
        } else {
          showNextSlide();
        }
      }
    }

    resetPointerState();
  };

  const handleWheel = (event) => {
    if (
      isSwipeDisabledArea(event) ||
      isPortfolioControl(event) ||
      isInteractiveElement(event)
    ) {
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
    dragOffset,
    isDragging,
    isSwipeInteracting,
    swipeHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerRelease,
      onPointerCancel: handlePointerRelease,
      onPointerLeave: handlePointerRelease,
      onWheel: handleWheel,
      onKeyDown: handleKeyDown,
    },
  };
};
