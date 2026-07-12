import { env } from "cloudflare:workers";
import { isAdminRequest } from "../../../../admin-auth";

const statuses = new Set(["new", "contacted", "qualified", "won", "closed"]);

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) return new Response("Forbidden", { status: 403 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return new Response("Forbidden", { status: 403 });

  const form = await request.formData();
  const id = Number(form.get("id"));
  const status = String(form.get("status") || "");
  if (!Number.isInteger(id) || id < 1 || !statuses.has(status)) return new Response("Invalid request", { status: 400 });

  await env.DB.prepare("UPDATE leads SET status = ? WHERE id = ?").bind(status, id).run();
  return Response.redirect(new URL("/admin#leads", request.url), 303);
}
