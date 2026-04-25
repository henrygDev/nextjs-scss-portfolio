import { useEffect, useState } from "react";

export const useTimedVisibility = (
  durationMs,
  fadeDurationMs = 0,
  shouldStart = true
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setIsVisible(false);
      setIsFadingOut(false);
      return undefined;
    }

    setIsVisible(true);
    setIsFadingOut(false);

    const fadeTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs);
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, durationMs + fadeDurationMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [durationMs, fadeDurationMs, shouldStart]);

  return { isVisible, isFadingOut };
};
