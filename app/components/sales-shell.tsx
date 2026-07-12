"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { languageOptions } from "../content";
import { useSiteLanguage } from "../use-site-language";

const nav = {
  tr: { products: "Ürünler", planner: "Alan Planlayıcı", quote: "Hızlı Teklif", dealers: "Bayi Başvurusu", documents: "Dokümanlar", contact: "İletişim" },
  en: { products: "Products", planner: "Coverage Planner", quote: "Quick Quote", dealers: "Become a Dealer", documents: "Documents", contact: "Contact" },
  zh: { products: "产品", planner: "覆盖规划", quote: "快速报价", dealers: "经销商申请", documents: "资料中心", contact: "联系我们" },
};

export function SalesShell({ children }: { children: (language: "tr" | "en" | "zh") => ReactNode }) {
  const { language, select } = useSiteLanguage();
  const copy = nav[language];
  return (
    <main className={`sales-page language-${language}`}>
      <header className="sales-nav">
        <Link className="brand" href="/">DDX<span>•</span></Link>
        <nav><Link href="/#products">{copy.products}</Link><Link href="/planner">{copy.planner}</Link><Link href="/quote">{copy.quote}</Link><Link href="/dealers">{copy.dealers}</Link><Link href="/documents">{copy.documents}</Link></nav>
        <div className="sales-nav-actions">
          <div className="language-switcher">{languageOptions.map((option) => <button key={option.id} type="button" aria-pressed={language === option.id} onClick={() => select(option.id)}>{option.short}</button>)}</div>
          <Link className="sales-contact" href="/#contact">{copy.contact} ↗</Link>
        </div>
      </header>
      {children(language)}
      <QuickContact language={language} />
      <footer className="sales-footer"><Link className="footer-brand" href="/">DUDEXA<span>®</span></Link><div><Link href="/projects">Projects</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/cookies">Cookies</Link><Link href="/admin">Admin</Link></div><small>© {new Date().getFullYear()} Dudexa GmbH</small></footer>
    </main>
  );
}

function QuickContact({ language }: { language: "tr" | "en" | "zh" }) {
  const text = { tr: "Hızlı iletişim", en: "Quick contact", zh: "快速联系" }[language];
  const mail = { tr: "Teklif iste", en: "Request quote", zh: "申请报价" }[language];
  return <div className="quick-contact"><span>{text}</span><a href="mailto:info@dudexa.com?subject=Dudexa%20website%20inquiry">{mail} ↗</a><a href="mailto:info@dudexa.com?subject=WhatsApp%20callback%20request">WhatsApp ↗</a></div>;
}
