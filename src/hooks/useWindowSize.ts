import { breakpoints } from '@/utils/breakpoints';
import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (isBrowser: boolean): WindowSize => {
  return {
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0
  };
};

export const useWindowSize = () => {
  const isBrowser = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState<WindowSize>(
    getWindowSize(isBrowser)
  );

  useEffect(() => {
    const handler = () => {
      setWindowSize(getWindowSize(isBrowser));
    };
    window?.addEventListener('resize', handler);
    return () => window?.removeEventListener('resize', handler);
  }, [isBrowser]);

  return {
    isMediumUp: windowSize.width > breakpoints.medium,
    isLargeUp: windowSize.width > breakpoints.large,
    isXLargeUp: windowSize.width > breakpoints.xLarge
  };
};
