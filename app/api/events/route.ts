import { env } from "cloudflare:workers";

const events = new Set(["page_view", "product_interest", "contact_opened", "finder_used", "document_opened"]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return new Response(null, { status: 403 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "invalid_json" }, { status: 400 }); }

  const eventName = String(body.eventName || "");
  const path = String(body.path || "").slice(0, 160);
  const language = String(body.language || "en").slice(0, 12);
  const product = body.product ? String(body.product).slice(0, 80) : null;
  const sessionId = String(body.sessionId || "").slice(0, 80);
  if (!events.has(eventName) || !path.startsWith("/") || sessionId.length < 8) {
    return Response.json({ error: "invalid_event" }, { status: 400 });
  }

  await env.DB.prepare(
    "INSERT INTO analytics_events (event_name, path, language, product, session_id) VALUES (?, ?, ?, ?, ?)",
  ).bind(eventName, path, language, product, sessionId).run();
  return new Response(null, { status: 204 });
}
