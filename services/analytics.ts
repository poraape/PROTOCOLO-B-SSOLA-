import { RiskClassification } from '../types/decision-tree-v2';

export type AnalyticsEventName =
  | 'triagem_iniciada'
  | 'triagem_abandonada'
  | 'resultado_gerado'
  | 'emergencia_acionada'
  | 'contato_gestao_acionado';

export interface AnalyticsEventPayload {
  nodeId?: string;
  riskClassification?: RiskClassification;
  tempo_total?: number;
  device?: string;
  [key: string]: unknown;
}

interface AnalyticsProvider {
  track: (eventName: AnalyticsEventName, payload: AnalyticsEventPayload) => void;
}

const TRIAGE_START_TIME_KEY = 'decision-v2-triage-start-time';

const detectDevice = (): string => {
  if (typeof window === 'undefined') return 'unknown';

  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1200) return 'tablet';
  return 'desktop';
};

const getTriageStartTime = (): number => {
  if (typeof window === 'undefined') return Date.now();

  const raw = window.sessionStorage.getItem(TRIAGE_START_TIME_KEY);
  const parsed = raw ? Number(raw) : NaN;

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  const now = Date.now();
  window.sessionStorage.setItem(TRIAGE_START_TIME_KEY, String(now));
  return now;
};

const setTriageStartTime = (): number => {
  const startTime = Date.now();
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(TRIAGE_START_TIME_KEY, String(startTime));
  }
  return startTime;
};

const getTempoTotalSeconds = (): number => {
  const start = getTriageStartTime();
  return Math.max(0, Math.round((Date.now() - start) / 1000));
};

let provider: AnalyticsProvider = {
  track: (eventName, payload) => {
    if (typeof window === 'undefined') return;

    const globalWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };

    if (typeof globalWindow.gtag === 'function') {
      globalWindow.gtag('event', eventName, payload);
      return;
    }

    if (Array.isArray(globalWindow.dataLayer)) {
      globalWindow.dataLayer.push({ event: eventName, ...payload });
      return;
    }

    if (typeof console !== 'undefined') {
      console.info('[analytics]', eventName, payload);
    }
  }
};

export const setAnalyticsProvider = (nextProvider: AnalyticsProvider): void => {
  provider = nextProvider;
};

const withBasePayload = (payload: AnalyticsEventPayload = {}): AnalyticsEventPayload => ({
  ...payload,
  tempo_total: payload.tempo_total ?? getTempoTotalSeconds(),
  device: payload.device ?? detectDevice()
});

export const trackDecisionEvent = (eventName: AnalyticsEventName, payload: AnalyticsEventPayload = {}): void => {
  provider.track(eventName, withBasePayload(payload));
};

export const startTriageTracking = (payload: AnalyticsEventPayload = {}): void => {
  setTriageStartTime();
  trackDecisionEvent('triagem_iniciada', payload);
};

export const clearTriageTracking = (): void => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(TRIAGE_START_TIME_KEY);
};
