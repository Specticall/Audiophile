import { useEffect, useRef, useState } from "react";

type TScreenType = "tablet" | "dekstop" | "phone" | "largeTablet";

const checkScreenType = (vwidth: number): TScreenType | never => {
  if (500 < vwidth && vwidth <= 768) {
    return "tablet";
  } else if (vwidth <= 500) {
    return "phone";
  } else if (768 < vwidth && vwidth <= 1024) {
    return "largeTablet";
  } else if (1024 < vwidth) {
    return "dekstop";
  } else {
    throw new Error(
      "Oops! Something went wrong while checking the viewport width"
    );
  }
};

export function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [height, setHeight] = useState(() => window.innerHeight);
  const [type, setType] = useState(() => checkScreenType(window.innerWidth));
  const previousScreenType = useRef<TScreenType | null>(null);
  const previousType = previousScreenType.current;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const currentType = checkScreenType(width);
      setHeight(height);
      setWidth(width);

      // Previous the previous screenType
      setType((previous) => {
        if (currentType !== previous) {
          previousScreenType.current = previous;
        }
        return currentType;
      });
    });
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  return { width, height, type, previousType };
}
