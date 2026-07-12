"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Language, languageOptions, ProductId } from "../content";
import { trackEvent } from "../analytics-client";
import { FinderChoice, knowledgeCopy } from "./knowledge-content";

const productOrder: ProductId[] = ["Mood", "Magnet", "Pro202", "Fli-X", "Prolit"];
const finderChoices: FinderChoice[] = ["hospitality", "retail", "industrial"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function KnowledgePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [finderChoice, setFinderChoice] = useState<FinderChoice>("hospitality");
  const trackedView = useRef(false);
  const copy = knowledgeCopy[language];
  const selected = copy.finder.options[finderChoice];

  useEffect(() => {
    const saved = window.localStorage.getItem("dudexa-language") as Language | null;
    const browserLanguage = window.navigator.language.toLowerCase();
    const detected: Language = browserLanguage.startsWith("tr") ? "tr" : browserLanguage.startsWith("zh") ? "zh" : "en";
    // Initial client preference is only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguage(saved && ["en", "tr", "zh"].includes(saved) ? saved : detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language === "tr" ? "tr" : "en";
    window.localStorage.setItem("dudexa-language", language);
    if (!trackedView.current) {
      trackedView.current = true;
      trackEvent("page_view", { language, path: "/knowledge" });
    }
  }, [language]);

  const quoteSubject = encodeURIComponent(`Dudexa inquiry: ${selected.recommendation}`);

  return (
    <main className={`knowledge-page language-${language}`}>
      <a className="skip-link" href="#finder">{copy.finder.label}</a>
      <a className="contact-dock" href="mailto:info@dudexa.com" aria-label="Email Dudexa: info@dudexa.com">
        <span>{copy.nav.contact}</span><i aria-hidden="true">@</i>
      </a>

      <header className="nav-shell knowledge-nav">
        <Link className="brand" href="/" aria-label={copy.nav.home}>DDX<span>•</span></Link>
        <nav aria-label="Knowledge Center navigation">
          <Link href="/">{copy.nav.home}</Link>
          <Link href="/#products">{copy.nav.products}</Link>
          <Link href="/planner">{language === "tr" ? "Planlayıcı" : language === "zh" ? "覆盖规划" : "Planner"}</Link>
          <a className="active" href="/knowledge">{copy.nav.knowledge}</a>
          <Link href="/#contact">{copy.nav.contact}</Link>
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label="Choose language">
            {languageOptions.map((option) => (
              <button key={option.id} type="button" aria-pressed={language === option.id} title={option.label} onClick={() => setLanguage(option.id)}>
                {option.short}
              </button>
            ))}
          </div>
          <a className="nav-cta" href={`mailto:info@dudexa.com?subject=${quoteSubject}`}>{copy.cta.action} <Arrow /></a>
        </div>
      </header>

      <section className="knowledge-hero">
        <div className="knowledge-hero-grid" aria-hidden="true" />
        <div className="knowledge-hero-copy">
          <p className="eyebrow"><span /> {copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="knowledge-hero-description">{copy.hero.description}</p>
          <small>{copy.hero.sourceNote}</small>
        </div>
        <div className="knowledge-index">
          {copy.index.map((item) => (
            <a href={item.href} key={item.href}>
              <span>{item.number}</span><strong>{item.title}</strong><small>{item.detail}</small><Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="knowledge-section finder-section" id="finder">
        <div className="knowledge-section-head">
          <p className="section-label"><span>01</span> {copy.finder.label}</p>
          <div><h2>{copy.finder.title}</h2><p>{copy.finder.description}</p></div>
        </div>
        <div className="finder-grid">
          <div className="finder-options" role="group" aria-label={copy.finder.label}>
            {finderChoices.map((choice, index) => {
              const item = copy.finder.options[choice];
              return (
                <button type="button" className={finderChoice === choice ? "selected" : ""} aria-pressed={finderChoice === choice} onClick={() => { setFinderChoice(choice); trackEvent("finder_used", { language, product: item.recommendation }); }} key={choice}>
                  <span>0{index + 1}</span><strong>{item.title}</strong><small>{item.detail}</small>
                </button>
              );
            })}
          </div>
          <div className="finder-result" aria-live="polite">
            <span>{copy.finder.resultLabel}</span>
            <strong>{selected.recommendation}</strong>
            <p>{selected.detail}</p>
            <a onClick={() => trackEvent("product_interest", { language, product: selected.recommendation })} href={`mailto:info@dudexa.com?subject=${quoteSubject}`}>{copy.finder.quote} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="knowledge-section comparison-section" id="compare">
        <div className="knowledge-section-head light">
          <p className="section-label light"><span>02</span> {copy.comparison.label}</p>
          <div><h2>{copy.comparison.title}</h2><p>{copy.comparison.description}</p></div>
        </div>
        <div className="comparison-scroll">
          <table className="comparison-table">
            <thead><tr><th>{copy.comparison.headers.product}</th><th>{copy.comparison.headers.mounting}</th><th>{copy.comparison.headers.lamp}</th><th>{copy.comparison.headers.detail}</th><th>{copy.comparison.headers.price}</th><th>{copy.comparison.headers.stock}</th></tr></thead>
            <tbody>
              {productOrder.map((product) => {
                const row = copy.comparison.rows[product];
                return (
                  <tr key={product}>
                    <th scope="row">{product}</th><td>{row.mounting}</td><td>{row.lamp}</td><td>{row.detail}</td>
                    <td><a onClick={() => trackEvent("product_interest", { language, product })} href={`mailto:info@dudexa.com?subject=${encodeURIComponent(`${product} price inquiry`)}`}>{copy.comparison.contact}</a></td>
                    <td><a onClick={() => trackEvent("product_interest", { language, product })} href={`mailto:info@dudexa.com?subject=${encodeURIComponent(`${product} availability inquiry`)}`}>{copy.comparison.contact}</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="knowledge-section placement-section" id="placement">
        <div className="knowledge-section-head">
          <p className="section-label"><span>03</span> {copy.placement.label}</p>
          <div><h2>{copy.placement.title}</h2><p>{copy.placement.description}</p></div>
        </div>
        <div className="placement-grid">
          {copy.placement.items.map((item) => <article key={item.number}><span>{item.number}</span><div className="placement-diagram" aria-hidden="true"><i /><i /><i /></div><h3>{item.title}</h3><p>{item.detail}</p></article>)}
        </div>
      </section>

      <section className="knowledge-section maintenance-section">
        <div className="knowledge-section-head">
          <p className="section-label"><span>04</span> {copy.maintenance.label}</p>
          <div><h2>{copy.maintenance.title}</h2></div>
        </div>
        <div className="maintenance-list">
          {copy.maintenance.items.map((item, index) => <article key={item.title}><span>{item.timing}</span><b>0{index + 1}</b><h3>{item.title}</h3><p>{item.detail}</p></article>)}
        </div>
      </section>

      <section className="knowledge-section boards-section">
        <div className="knowledge-section-head light">
          <p className="section-label light"><span>05</span> {copy.boards.label}</p>
          <div><h2>{copy.boards.title}</h2><p>{copy.boards.description}</p></div>
        </div>
        <div className="board-models">
          {copy.boards.models.map((model) => (
            <article key={model.model}>
              <div className="board-sample" aria-hidden="true"><b>DUDEXA</b></div>
              <span>MODEL {model.model}</span><strong>{model.size}</strong><p>{model.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="knowledge-section documents-section" id="documents">
        <div className="knowledge-section-head">
          <p className="section-label"><span>06</span> {copy.documents.label}</p>
          <div><h2>{copy.documents.title}</h2><p>{copy.documents.description}</p></div>
        </div>
        <div className="document-list">
          {copy.documents.items.map((item, index) => (
            <a onClick={() => trackEvent("document_opened", { language, product: item.title })} href={item.href} target="_blank" rel="noreferrer" key={item.href}>
              <span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.meta}</small></div><b>{copy.documents.open}</b><Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="knowledge-section faq-section">
        <div className="knowledge-section-head">
          <p className="section-label"><span>07</span> {copy.faq.label}</p>
          <div><h2>{copy.faq.title}</h2></div>
        </div>
        <div className="faq-list">
          {copy.faq.items.map((item, index) => (
            <details key={item.question}><summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>
          ))}
        </div>
      </section>

      <section className="knowledge-cta">
        <p className="section-label light"><span>08</span> {copy.cta.label}</p>
        <div><h2>{copy.cta.title}</h2><p>{copy.cta.description}</p><a href="mailto:info@dudexa.com">{copy.cta.action} <Arrow /></a></div>
      </section>

      <footer>
        <Link className="footer-brand" href="/">DUDEXA<span>®</span></Link><p>{copy.footer.statement}</p>
        <div><Link href="/">{copy.footer.home}</Link><a href="https://www.dudexa.com" target="_blank" rel="noreferrer">Dudexa.com</a><a href="mailto:info@dudexa.com">{copy.footer.email}</a></div>
        <small>© {new Date().getFullYear()} Dudexa GmbH</small>
      </footer>
    </main>
  );
}
