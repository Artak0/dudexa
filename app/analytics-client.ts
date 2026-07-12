"use client";

type EventName = "page_view" | "product_interest" | "contact_opened" | "finder_used" | "document_opened";

export function getAnalyticsSessionId() {
  const key = "dudexa-session";
  let value = window.localStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    window.localStorage.setItem(key, value);
  }
  return value;
}

export function trackEvent(eventName: EventName, options: { language?: string; product?: string; path?: string } = {}) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1" || window.localStorage.getItem("dudexa-cookie-consent") !== "accepted") return;
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventName,
      path: options.path || window.location.pathname,
      language: options.language || document.documentElement.lang,
      product: options.product,
      sessionId: getAnalyticsSessionId(),
    }),
  }).catch(() => undefined);
}
