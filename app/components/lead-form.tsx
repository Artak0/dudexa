"use client";

import { FormEvent, useState } from "react";
import { getAnalyticsSessionId } from "../analytics-client";

export function LeadForm({ language, source, product, details = "" }: { language: "tr" | "en" | "zh"; source: string; product?: string; details?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const copy = {
    tr: { name: "Adınız", email: "İş e-postanız", message: "Projenizi anlatın", send: "Talebi gönder", sending: "Gönderiliyor…", success: "Talebiniz kaydedildi. Dudexa ekibi sizinle iletişime geçecek.", error: "Gönderilemedi. Lütfen info@dudexa.com adresine yazın." },
    en: { name: "Your name", email: "Work email", message: "Tell us about the project", send: "Send request", sending: "Sending…", success: "Your request was recorded. The Dudexa team will contact you.", error: "Could not send. Please email info@dudexa.com." },
    zh: { name: "姓名", email: "工作邮箱", message: "请介绍项目", send: "发送申请", sending: "正在发送…", success: "您的申请已记录，Dudexa 团队将与您联系。", error: "发送失败，请联系 info@dudexa.com。" },
  }[language];
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setState("sending");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message: `${details}\n${String(data.get("message") || "")}`.trim(), companyWebsite: data.get("companyWebsite"), language, source, product, sessionId: getAnalyticsSessionId() }) });
      if (!response.ok) throw new Error(); form.reset(); setState("success");
    } catch { setState("error"); }
  }
  return <form className="sales-lead-form" onSubmit={submit}><input className="form-honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" /><label>{copy.name}<input name="name" required /></label><label>{copy.email}<input name="email" type="email" required /></label><label>{copy.message}<textarea name="message" rows={4} required /></label><button disabled={state === "sending"}>{state === "sending" ? copy.sending : copy.send} ↗</button><p className={state}>{state === "success" ? copy.success : state === "error" ? copy.error : ""}</p></form>;
}
