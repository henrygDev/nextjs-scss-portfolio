import { useEffect, useRef } from "react";

const WHEEL_THRESHOLD = 1;
const TOUCH_THRESHOLD = 12;
const NAVIGATION_LOCK_MS = 700;
let navigationLockUntil = 0;

const isNavigationLocked = () => Date.now() < navigationLockUntil;
const lockNavigation = () => {
  navigationLockUntil = Date.now() + NAVIGATION_LOCK_MS;
};

export const useSectionSnapNavigation = (sectionRef, options = {}) => {
  const { previousSectionId = null, nextSectionId = null } = options;
  const touchStart = useRef({ x: null, y: null });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const navigateToSection = (sectionId) => {
      if (!sectionId || isNavigationLocked()) {
        return;
      }

      const targetSection = document.getElementById(sectionId);

      if (!targetSection) {
        return;
      }

      lockNavigation();
      touchStart.current = { x: null, y: null };
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleWheel = (event) => {
      if (
        Math.abs(event.deltaY) <= WHEEL_THRESHOLD ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) {
        return;
      }

      if (event.deltaY > 0) {
        event.preventDefault();
        navigateToSection(nextSectionId);
        return;
      }

      event.preventDefault();
      navigateToSection(previousSectionId);
    };

    const handleTouchStart = (event) => {
      touchStart.current = {
        x: event.touches[0]?.clientX ?? null,
        y: event.touches[0]?.clientY ?? null,
      };
    };

    const handleTouchMove = (event) => {
      if (touchStart.current.x === null || touchStart.current.y === null) {
        return;
      }

      const currentX = event.touches[0]?.clientX ?? touchStart.current.x;
      const currentY = event.touches[0]?.clientY ?? touchStart.current.y;
      const deltaX = touchStart.current.x - currentX;
      const deltaY = touchStart.current.y - currentY;

      if (
        Math.abs(deltaY) <= TOUCH_THRESHOLD ||
        Math.abs(deltaY) <= Math.abs(deltaX)
      ) {
        return;
      }

      event.preventDefault();

      if (deltaY > 0) {
        navigateToSection(nextSectionId);
        return;
      }

      navigateToSection(previousSectionId);
    };

    const clearTouchStart = () => {
      touchStart.current = { x: null, y: null };
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    section.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    section.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    section.addEventListener("touchend", clearTouchStart);
    section.addEventListener("touchcancel", clearTouchStart);

    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", clearTouchStart);
      section.removeEventListener("touchcancel", clearTouchStart);
    };
  }, [nextSectionId, previousSectionId, sectionRef]);
};
