import { env } from "cloudflare:workers";
import { headers } from "next/headers";

export type AdminIdentity = {
  email: string;
  name: string;
  provider: "openai" | "cloudflare-access";
};

function allowedAdminEmails() {
  const value = (env as unknown as Record<string, string | undefined>).ADMIN_EMAILS || "";
  return new Set(value.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean));
}

export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  const requestHeaders = await headers();
  const openAiEmail = requestHeaders.get("oai-authenticated-user-email")?.toLowerCase();
  const accessEmail = requestHeaders.get("cf-access-authenticated-user-email")?.toLowerCase();
  const accessAssertion = requestHeaders.get("cf-access-jwt-assertion");
  const localEmail = requestHeaders.get("host")?.startsWith("localhost") ? [...allowedAdminEmails()][0] : null;
  const email = openAiEmail || (accessEmail && accessAssertion ? accessEmail : null) || localEmail;

  if (!email || !allowedAdminEmails().has(email)) return null;

  const encodedName = requestHeaders.get("oai-authenticated-user-full-name");
  let name = email;
  if (openAiEmail && encodedName) {
    try { name = decodeURIComponent(encodedName); } catch { name = email; }
  }

  return {
    email,
    name,
    provider: openAiEmail ? "openai" : "cloudflare-access",
  };
}

export async function isAdminRequest(request: Request) {
  const openAiEmail = request.headers.get("oai-authenticated-user-email")?.toLowerCase();
  const accessEmail = request.headers.get("cf-access-authenticated-user-email")?.toLowerCase();
  const accessAssertion = request.headers.get("cf-access-jwt-assertion");
  const localEmail = new URL(request.url).hostname === "localhost" ? [...allowedAdminEmails()][0] : null;
  const email = openAiEmail || (accessEmail && accessAssertion ? accessEmail : null) || localEmail;
  return Boolean(email && allowedAdminEmails().has(email));
}
