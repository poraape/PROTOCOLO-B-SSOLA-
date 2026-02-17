import { Service } from '../types';

interface NetworkValidityResult {
  expiredServiceIds: string[];
  hasExpiredServices: boolean;
}

const parseDate = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

export const checkNetworkValidity = (services: Service[], today = new Date()): NetworkValidityResult => {
  const referenceDate = new Date(today);
  referenceDate.setHours(0, 0, 0, 0);

  const expiredServiceIds = services
    .filter((service) => {
      const validUntil = parseDate(service.validUntil);
      return !!validUntil && validUntil < referenceDate;
    })
    .map((service) => service.id);

  return {
    expiredServiceIds,
    hasExpiredServices: expiredServiceIds.length > 0
  };
};
