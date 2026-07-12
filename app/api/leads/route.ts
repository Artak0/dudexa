import { env } from "cloudflare:workers";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return new Response(null, { status: 403 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "invalid_json" }, { status: 400 }); }

  if (body.companyWebsite) return Response.json({ ok: true });
  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 180);
  const message = String(body.message || "").trim().slice(0, 4000);
  const language = String(body.language || "en").slice(0, 12);
  const source = String(body.source || "website").trim().slice(0, 60) || "website";
  const product = body.product ? String(body.product).trim().slice(0, 80) : null;
  const sessionId = String(body.sessionId || "form").slice(0, 80);
  if (name.length < 2 || !emailPattern.test(email) || message.length < 8) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const duplicate = await env.DB.prepare(
    "SELECT id FROM leads WHERE email = ? AND created_at > datetime('now', '-2 minutes') LIMIT 1",
  ).bind(email).first();
  if (duplicate) return Response.json({ ok: true, duplicate: true });

  await env.DB.batch([
    env.DB.prepare("INSERT INTO leads (name, email, message, language, source) VALUES (?, ?, ?, ?, ?)").bind(name, email, message, language, source),
    env.DB.prepare("INSERT INTO analytics_events (event_name, path, language, product, session_id) VALUES ('lead_submitted', ?, ?, ?, ?)").bind(`/lead/${source}`, language, product, sessionId),
  ]);
  return Response.json({ ok: true });
}
