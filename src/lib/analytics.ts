export type AnalyticsEvent =
  | "view_item"
  | "select_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "sign_up"
  | "view_tiktok"
  | "view_instagram"
  | "view_snapchat"
  | "lookbook_engagement";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  parameters: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...parameters,
  });
}
