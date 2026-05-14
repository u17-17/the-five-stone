import { inject, pageview, track } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

type AnalyticsPropertyValue = string | number | boolean | null | undefined;
export type AnalyticsEventProperties = Record<string, AnalyticsPropertyValue>;

export type AnalyticsEventName =
  | 'story_cta_click'
  | 'collection_click'
  | 'product_card_click'
  | 'buy_now_click'
  | 'newsletter_submit'
  | 'contact_click'
  | 'whatsapp_click'
  | 'crisp_open'
  | 'paypal_checkout_click';

export const analyticsEvents = {
  storyCtaClick: 'story_cta_click',
  collectionClick: 'collection_click',
  productCardClick: 'product_card_click',
  buyNowClick: 'buy_now_click',
  newsletterSubmit: 'newsletter_submit',
  contactClick: 'contact_click',
  whatsappClick: 'whatsapp_click',
  crispOpen: 'crisp_open',
  paypalCheckoutClick: 'paypal_checkout_click',
} as const satisfies Record<string, AnalyticsEventName>;

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;
let speedInsightsRouteController: ReturnType<typeof injectSpeedInsights> = null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isLocalHost(): boolean {
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
}

function cleanProperties(properties: AnalyticsEventProperties = {}): AnalyticsEventProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  );
}

function loadGoogleAnalytics(): void {
  if (!isBrowser() || !GA_MEASUREMENT_ID || isLocalHost() || window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

export function initAnalytics(): void {
  if (!isBrowser() || initialized) return;

  initialized = true;
  const useLocalDebugScripts = isLocalHost();

  inject({
    framework: 'vite',
    disableAutoTrack: true,
    mode: useLocalDebugScripts ? 'development' : 'production',
    scriptSrc: useLocalDebugScripts
      ? 'https://va.vercel-scripts.com/v1/script.debug.js'
      : undefined,
  });
  speedInsightsRouteController = injectSpeedInsights({
    framework: 'vite',
    scriptSrc: useLocalDebugScripts
      ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
      : undefined,
  });
  loadGoogleAnalytics();
}

export function trackPageView(path: string = window.location.pathname): void {
  if (!isBrowser()) return;

  try {
    pageview({ route: path, path: `${window.location.pathname}${window.location.search}` });
    speedInsightsRouteController?.setRoute(path);

    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: path,
      });
    }
  } catch {
    // Analytics must never interrupt the storefront experience.
  }
}

export function trackEvent(
  name: AnalyticsEventName,
  properties: AnalyticsEventProperties = {},
): void {
  if (!isBrowser()) return;

  const safeProperties = cleanProperties(properties);

  try {
    track(name, safeProperties);
  } catch {
    // Vercel Analytics is optional and should fail silently.
  }

  try {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('event', name, safeProperties);
    }
  } catch {
    // GA4 may be blocked or unavailable; never surface this to users.
  }
}

export function trackWhatsappClick(properties?: AnalyticsEventProperties): void {
  trackEvent(analyticsEvents.whatsappClick, properties);
}

export function trackCrispOpen(properties?: AnalyticsEventProperties): void {
  trackEvent(analyticsEvents.crispOpen, properties);
}

export function trackPaypalCheckoutClick(properties?: AnalyticsEventProperties): void {
  trackEvent(analyticsEvents.paypalCheckoutClick, properties);
}
