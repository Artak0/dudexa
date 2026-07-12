"use client";

import { CSSProperties, FormEvent, MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Language, languageOptions, localizedCopy, ProductId } from "./content";
import { getAnalyticsSessionId, trackEvent } from "./analytics-client";
import Link from "next/link";

type Product = {
  name: ProductId;
  number: string;
  image: string;
  capturePoint: { x: number; y: number };
  tone: "cyan" | "cyan-acid";
};

const products: Product[] = [
  { name: "Mood", number: "01", image: "/dudexa-mood.jpg", capturePoint: { x: .52, y: .55 }, tone: "cyan" },
  { name: "Magnet", number: "02", image: "/dudexa-magnet.jpg", capturePoint: { x: .51, y: .52 }, tone: "cyan" },
  { name: "Pro202", number: "03", image: "/dudexa-pro202.jpg", capturePoint: { x: .57, y: .47 }, tone: "cyan" },
  { name: "Fli-X", number: "04", image: "/dudexa-flix.jpg", capturePoint: { x: .50, y: .53 }, tone: "cyan-acid" },
  { name: "Prolit", number: "05", image: "/dudexa-prolit.jpg", capturePoint: { x: .52, y: .59 }, tone: "cyan-acid" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function AmbientFlyField({ onCapture }: { onCapture: () => void }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let nextShockAt = 0;
    const flyNodes = Array.from(document.querySelectorAll<HTMLElement>(".ambient-fly"));
    const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));
    const random = (min: number, max: number) => min + Math.random() * (max - min);

    const animateFly = async (node: HTMLElement, index: number) => {
      await wait(900 + index * 1800);

      while (!cancelled) {
        if (document.hidden) {
          await wait(900);
          continue;
        }

        const viewportTop = window.scrollY;
        const fromLeft = (index + Math.floor(Math.random() * 2)) % 2 === 0;
        let x = fromLeft ? -24 : window.innerWidth + 24;
        let y = viewportTop + random(90, Math.max(140, window.innerHeight - 80));
        const waypoints = [
          { x, y },
          { x: random(window.innerWidth * .12, window.innerWidth * .88), y: viewportTop + random(100, window.innerHeight * .78) },
          { x: random(window.innerWidth * .16, window.innerWidth * .84), y: viewportTop + random(120, window.innerHeight * .84) },
          { x: random(window.innerWidth * .20, window.innerWidth * .80), y: viewportTop + random(100, window.innerHeight * .80) },
        ];

        node.dataset.phase = "roam";
        node.style.willChange = "transform";
        const roam = node.animate(
          waypoints.map((point, step) => ({
            transform: `translate3d(${point.x}px, ${point.y}px, 0) rotate(${step * 125}deg)`,
            offset: step / (waypoints.length - 1),
          })),
          { duration: random(4200, 6200), easing: "cubic-bezier(.45,.03,.28,.98)", fill: "forwards" },
        );
        try { await roam.finished; } catch { return; }
        if (cancelled) return;

        x = waypoints.at(-1)!.x;
        y = waypoints.at(-1)!.y;
        const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-uv-trap]")).filter((target) => {
          const rect = target.getBoundingClientRect();
          return rect.bottom > 72 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
        });

        if (!targets.length) {
          roam.cancel();
          node.dataset.phase = "idle";
          await wait(500);
          continue;
        }

        const turnWait = Math.max(0, nextShockAt - Date.now());
        await wait(turnWait);
        if (cancelled) return;
        nextShockAt = Date.now() + 4300;

        const target = targets[(index + Math.floor(Math.random() * targets.length)) % targets.length];
        const rect = target.getBoundingClientRect();
        const targetX = rect.left + window.scrollX + rect.width * Number(target.dataset.captureX || .5);
        const targetY = rect.top + window.scrollY + rect.height * Number(target.dataset.captureY || .5);
        target.classList.add("is-attracting");
        node.dataset.phase = "approach";
        roam.cancel();

        const approach = node.animate([
          { transform: `translate3d(${x}px, ${y}px, 0) rotate(0deg)` },
          { transform: `translate3d(${(x + targetX) / 2 + 56}px, ${(y + targetY) / 2 - 44}px, 0) rotate(170deg)`, offset: .58 },
          { transform: `translate3d(${targetX}px, ${targetY}px, 0) rotate(350deg)` },
        ], { duration: random(900, 1180), easing: "cubic-bezier(.32,.02,.3,1)", fill: "forwards" });

        try { await approach.finished; } catch { return; }
        if (cancelled) return;
        target.classList.remove("is-attracting");
        target.classList.add("is-zapping");
        node.dataset.phase = "shock";
        await wait(180);
        if (cancelled) return;
        node.dataset.phase = "ash";
        onCapture();
        await wait(860);
        target.classList.remove("is-zapping");
        approach.cancel();
        node.dataset.phase = "idle";
        node.style.willChange = "";
        await wait(random(1200, 2600));
      }
    };

    flyNodes.forEach((node, index) => { void animateFly(node, index); });
    return () => {
      cancelled = true;
      flyNodes.forEach((node) => node.getAnimations({ subtree: true }).forEach((animation) => animation.cancel()));
      document.querySelectorAll(".is-attracting, .is-zapping").forEach((target) => target.classList.remove("is-attracting", "is-zapping"));
    };
  }, [onCapture]);

  return (
    <div className="ambient-flies" aria-hidden="true">
      {[0, 1, 2].map((fly) => (
        <span className="ambient-fly" data-phase="idle" key={fly}>
          <span className="ambient-fly__sprite">
            <i className="ambient-fly__wing ambient-fly__wing--left" />
            <i className="ambient-fly__wing ambient-fly__wing--right" />
          </span>
          <span className="ambient-fly__arc" />
          <span className="ambient-fly__ash">
            {Array.from({ length: 7 }, (_, index) => (
              <i key={index} style={{ "--ash-angle": `${index * 51}deg`, "--ash-delay": `${index * 14}ms` } as CSSProperties} />
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [caught, setCaught] = useState(1847);
  const [knowledgeTransition, setKnowledgeTransition] = useState(false);
  const [inquiryState, setInquiryState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const trackedView = useRef(false);
  const copy = localizedCopy[language];

  const onCapture = useCallback(() => setCaught((value) => value + 1), []);

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
      trackEvent("page_view", { language, path: "/" });
    }
  }, [language]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function selectLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
  }

  function openKnowledge(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (knowledgeTransition) return;
    setKnowledgeTransition(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => window.location.assign("/knowledge"), reduceMotion ? 180 : 1650);
  }

  async function handleInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquiryState("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), message: data.get("message"),
          companyWebsite: data.get("companyWebsite"), language, sessionId: getAnalyticsSessionId(),
        }),
      });
      if (!response.ok) throw new Error("request_failed");
      form.reset();
      setInquiryState("success");
    } catch {
      setInquiryState("error");
    }
  }

  const accessibleText = (template: string, name: string) => template.replace("{name}", name);

  return (
    <main className={`site-shell language-${language}`}>
      <a className="skip-link" href="#products">{copy.navigation.products}</a>
      <div className="intro-sequence" aria-hidden="true">
        <span>DUDEXA</span><i /><small>SCIENCE TO INSECTS</small>
      </div>
      {knowledgeTransition && (
        <div className="knowledge-transition" role="status" aria-live="polite">
          <div className="transition-scene" aria-hidden="true">
            <span className="transition-fly-icon"><i /><i /></span>
            <span className="transition-impact" />
            <div className="transition-book"><b>FIELD NOTES</b><i /><i /><i /></div>
          </div>
          <p>{copy.transition.message}</p>
        </div>
      )}
      <AmbientFlyField onCapture={onCapture} />
      <a className="contact-dock" href="mailto:info@dudexa.com" aria-label={`Email Dudexa: info@dudexa.com`}>
        <span>{copy.navigation.contact}</span><i aria-hidden="true">@</i>
      </a>

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label={copy.accessibility.home}>DDX<span>•</span></a>
        <nav aria-label={copy.accessibility.primaryNavigation}>
          <a href="#science">{copy.navigation.science}</a>
          <a href="#products">{copy.navigation.products}</a>
          <Link href="/planner">{copy.navigation.planner}</Link>
          <a href="/knowledge" onClick={openKnowledge}>{copy.navigation.knowledge}</a>
          <a href="#contact">{copy.navigation.contact}</a>
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label={copy.accessibility.languageSelector}>
            {languageOptions.map((option) => (
              <button key={option.id} type="button" aria-pressed={language === option.id} title={option.label} onClick={() => selectLanguage(option.id)}>
                {option.short}
              </button>
            ))}
          </div>
          <a className="nav-cta" href="mailto:info@dudexa.com">{copy.navigation.startProject} <Arrow /></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> {copy.hero.eyebrow}</p>
          <h1><span className="hero-title-one">{copy.hero.titleLine1}</span><span className="hero-title-two">{copy.hero.titleLine2}</span></h1>
          <div className="hero-bottom">
            <p>{copy.hero.description}</p>
            <a className="round-link" href="#products" aria-label={copy.accessibility.exploreProducts}>↓</a>
          </div>
        </div>

        <div className="capture-stage" aria-label={copy.accessibility.captureStage}>
          <div className="beam beam-one" aria-hidden="true" />
          <div className="beam beam-two" aria-hidden="true" />
          <div className="trap" data-uv-trap data-capture-x=".51" data-capture-y=".50" data-trap-tone="cyan">
            <div className="trap-sheen" />
            <div className="trap-slot lamp-one"><span /></div>
            <div className="trap-slot lamp-two"><span /></div>
            <div className="trap-grid" />
            <div className="trap-logo">Dudexa</div>
            <span className="uv-hotspot" />
          </div>
          <div className="model-nameplate"><span>MODEL / 01</span><strong>{copy.hero.model}</strong></div>
          <div className="capture-counter">
            <span>{copy.hero.liveSimulation}</span>
            <strong>{caught.toLocaleString(copy.locale)}</strong>
            <small>{copy.hero.interceptions}</small>
          </div>
        </div>
      </section>

      <div className="spec-rail" aria-hidden="true">
        <div className="spec-rail-track">
          <span>UV-A ATTRACTION</span><i /> <span>304 INOX</span><i /> <span>15W / 18W</span><i /> <span>UV-RESISTANT GLUE</span><i />
          <span>UV-A ATTRACTION</span><i /> <span>304 INOX</span><i /> <span>15W / 18W</span><i /> <span>UV-RESISTANT GLUE</span><i />
        </div>
      </div>

      <section className="manifesto" id="science">
        <div className="section-label" data-reveal><span>01</span> {copy.principle.sectionLabel}</div>
        <div className="manifesto-copy">
          <p className="lead" data-reveal>{copy.principle.lead} <em>{copy.principle.emphasis}</em></p>
          <div className="science-grid">
            {[copy.principle.attract, copy.principle.capture, copy.principle.control].map((item, index) => (
              <article data-reveal key={item.title}>
                <span className="science-number">0{index + 1}</span>
                <div className={`science-icon science-icon-${index + 1}`} aria-hidden="true"><i /></div>
                <h3>{item.title}</h3><p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="products-heading">
          <div className="section-label light" data-reveal><span>02</span> {copy.productsSection.sectionLabel}</div>
          <h2 data-reveal>{copy.productsSection.title}</h2>
          <p data-reveal>{copy.productsSection.description}</p>
        </div>

        <div className="product-list">
          {products.map((product) => {
            const productCopy = copy.products[product.name];
            return (
              <article className={`product-card product-${product.number}`} key={product.name} data-reveal>
                <Link className="product-image" href={`/products/${product.name.toLowerCase().replace("-", "-")}`} data-uv-trap data-capture-x={product.capturePoint.x} data-capture-y={product.capturePoint.y} data-trap-tone={product.tone}>
                  <img src={product.image} alt={accessibleText(copy.accessibility.productImage, product.name)} />
                  <div className="product-scan" aria-hidden="true" />
                  <div className="product-grid-overlay" aria-hidden="true" />
                  <span className="uv-hotspot" />
                  <span className="product-tag">{productCopy.tag}</span>
                  <span className="product-view">{copy.productsSection.view} <Arrow /></span>
                </Link>
                <div className="product-meta">
                  <span>{product.number}</span>
                  <div><h3>{product.name}</h3><p>{productCopy.type}</p></div>
                  <p className="details">{productCopy.details}</p>
                  <a onClick={() => trackEvent("product_interest", { language, product: product.name })} href={`mailto:info@dudexa.com?subject=${encodeURIComponent(`Dudexa ${product.name} inquiry`)}`} aria-label={accessibleText(copy.accessibility.askAboutProduct, product.name)}><Arrow /></a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="materials">
        <div className="section-label" data-reveal><span>03</span> {copy.ecosystem.sectionLabel}</div>
        <div className="materials-copy"><h2 data-reveal>{copy.ecosystem.title}</h2><p data-reveal>{copy.ecosystem.description}</p></div>
        <div className="materials-grid">
          <article data-reveal>
            <span>{copy.ecosystem.glueBoards.category}</span>
            <div className="glueboard-visual" aria-hidden="true"><b>DUDEXA</b></div>
            <h3>{copy.ecosystem.glueBoards.title}</h3><p>{copy.ecosystem.glueBoards.description}</p>
            <a href="mailto:info@dudexa.com?subject=Glue%20board%20inquiry">{copy.ecosystem.glueBoards.action} <Arrow /></a>
          </article>
          <article className="purple-card" data-reveal>
            <span>{copy.ecosystem.uvLamps.category}</span>
            <div className="lamp-visual" aria-hidden="true"><i /><i /></div>
            <h3>{copy.ecosystem.uvLamps.title}</h3><p>{copy.ecosystem.uvLamps.description}</p>
            <a href="mailto:info@dudexa.com?subject=UV%20lamp%20inquiry">{copy.ecosystem.uvLamps.action} <Arrow /></a>
          </article>
          <article className="yellow-card" data-reveal>
            <span>{copy.ecosystem.tracquipment.category}</span>
            <div className="digital-visual" aria-hidden="true"><i /><i /><i /><b>84%</b></div>
            <h3>{copy.ecosystem.tracquipment.title}</h3><p>{copy.ecosystem.tracquipment.description}</p>
            <a href="https://www.tracquipment.com" target="_blank" rel="noreferrer">{copy.ecosystem.tracquipment.action} <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro">
          <div className="section-label light" data-reveal><span>04</span> {copy.contact.location}</div>
          <h2 data-reveal>{copy.contact.title}</h2><p data-reveal>{copy.contact.description}</p>
          <div className="contact-details" data-reveal>
            <a href="mailto:info@dudexa.com">info@dudexa.com <Arrow /></a>
            <address>Brehmstraße 3<br />40239 Düsseldorf, Germany</address>
            <p>{copy.contact.officeHours}<br />07:30 — 16:00</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleInquiry} data-reveal>
          <label className="form-honeypot" aria-hidden="true">Website<input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" /></label>
          <label>{copy.contact.nameLabel}<input name="name" type="text" placeholder={copy.contact.namePlaceholder} required /></label>
          <label>{copy.contact.emailLabel}<input name="email" type="email" placeholder={copy.contact.emailPlaceholder} required /></label>
          <label>{copy.contact.messageLabel}<textarea name="message" rows={4} placeholder={copy.contact.messagePlaceholder} required /></label>
          <button type="submit" disabled={inquiryState === "sending"}>{inquiryState === "sending" ? copy.contact.sending : copy.contact.submit} <Arrow /></button>
          <small className={`form-status ${inquiryState}`}>{inquiryState === "success" ? copy.contact.success : inquiryState === "error" ? copy.contact.error : copy.contact.emailNotice}</small>
        </form>
      </section>

      <footer>
        <a className="footer-brand" href="#top">DUDEXA<span>®</span></a>
        <p>{copy.footer.statement.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
        <div><a href="https://www.instagram.com/dudexagmbh/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.dudexa.com" target="_blank" rel="noreferrer">Dudexa.com</a><a href="mailto:info@dudexa.com">{copy.footer.email}</a></div>
        <small>© {new Date().getFullYear()} Dudexa GmbH</small>
      </footer>
    </main>
  );
}
