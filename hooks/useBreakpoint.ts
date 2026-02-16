import { useEffect, useState } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getBreakpoint(window.innerWidth));
    updateBreakpoint();

    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop'
  };
};
