import { breakpoints } from "@/utils/breakpoints";
import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (): WindowSize => ({
  //null check for window because window missing in SSR
  width: window?.innerWidth,
  height: window?.innerHeight,
});

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());

  useEffect(() => {
    const handler = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return {
    isMediumUp: windowSize.width > breakpoints.medium,
    isLargeUp: windowSize.width > breakpoints.large,
    isXLargeUp: windowSize.width > breakpoints.xLarge,
  };
};
