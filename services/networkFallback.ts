export const shouldUseListFallback = (physicalServiceCount: number, geocodedCount: number) => {
  return physicalServiceCount > 0 && geocodedCount === 0;
};
