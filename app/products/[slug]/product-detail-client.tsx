"use client";

import Link from "next/link";
import type { ProductRecord } from "../../catalog";
import { LeadForm } from "../../components/lead-form";
import { SalesShell } from "../../components/sales-shell";

const copy = {
  tr: { system: "Profesyonel uçan haşere kontrolü", use: "Önerilen kullanım", specs: "Teknik yapı", mount: "Montaj görünümü", quote: "Teklif iste", planner: "Alan planlayıcıda deneyin", coverage: "Planlama kapsaması", notice: "Kapsama değeri ön planlama tahminidir; ışık, giriş noktaları ve böcek yoğunluğuna göre saha teyidi gerekir.", labels: ["Montaj", "Lamba", "Malzeme", "Cihaz ölçüsü", "Yapışkan levha", "Planlama alanı"], mountSteps: ["Cihazı doğrudan güneş ve açılan kapılardan uzaklaştırın.", "Gıda hazırlama yüzeylerinin doğrudan üzerine yerleştirmeyin.", "Gündüz uçan böcekler için duvar cihazını yaklaşık 1–2 m yüksekliğe yerleştirin."] },
  en: { system: "Professional flying-insect control", use: "Recommended use", specs: "Technical structure", mount: "Installation view", quote: "Request a quote", planner: "Try in coverage planner", coverage: "Planning coverage", notice: "Coverage is a planning estimate; light, entry points and insect pressure require on-site confirmation.", labels: ["Mounting", "Lamp", "Material", "Device size", "Glue board", "Planning area"], mountSteps: ["Keep the unit away from direct daylight and opening doors.", "Never install directly above food preparation surfaces.", "For daytime flying insects, position wall units around 1–2 m above the floor."] },
  zh: { system: "专业飞虫防控", use: "推荐场景", specs: "技术结构", mount: "安装示意", quote: "申请报价", planner: "在覆盖规划器中试用", coverage: "规划覆盖面积", notice: "覆盖面积仅用于初步规划，需结合光线、入口和虫害压力进行现场确认。", labels: ["安装方式", "灯管", "材质", "设备尺寸", "粘虫板", "规划面积"], mountSteps: ["远离阳光直射和频繁开启的门。", "不要安装在食品操作台正上方。", "针对昼行飞虫，壁挂设备建议安装在离地约 1–2 米处。"] },
};

export default function ProductDetailClient({ product }: { product: ProductRecord }) {
  return <SalesShell>{(language) => { const c = copy[language]; const specs = [product.mounting === "wall" ? (language === "tr" ? "Duvar" : language === "zh" ? "壁挂" : "Wall") : (language === "tr" ? "Tavan" : language === "zh" ? "吊装" : "Ceiling"), product.lamp, product.material, product.dimensions, product.board, `≈ ${product.planningCoverage} m²`]; return <>
    <section className="sales-hero"><div className="sales-hero-copy"><span className="sales-kicker">{c.system} / {product.name}</span><h1>{product.name}</h1><p><strong>{product.use[language]}</strong><br />{product.summary[language]}</p><div className="sales-hero-actions"><a className="sales-button" href="#quote">{c.quote} ↗</a><Link className="sales-button secondary" href={`/planner?product=${product.slug}`}>{c.planner} ↗</Link></div></div><div className="product-hero-visual"><img src={product.image} alt={`Dudexa ${product.name}`} /></div></section>
    <section className="sales-section"><div className="sales-section-head"><span>01 / {c.specs}</span><div><h2>{c.specs}</h2><p>{c.notice}</p></div></div><div className="spec-grid">{specs.map((value,index)=><article key={c.labels[index]}><span>{c.labels[index]}</span><strong>{value}</strong>{index===5&&<small>{c.notice}</small>}</article>)}</div></section>
    <section className="sales-section dark"><div className="sales-section-head"><span>02 / {c.mount}</span><div><h2>{c.mount}</h2></div></div><div className="mounting-grid"><div className={`mounting-diagram ${product.mounting}`}><div className="room-wall"/><div className="device"/></div><div className="mounting-notes"><ol>{c.mountSteps.map(step=><li key={step}>{step}</li>)}</ol></div></div></section>
    <section className="sales-section violet sales-form-section" id="quote"><div><span className="sales-kicker">03 / {c.quote}</span><h2>{product.name}<br />{c.quote}</h2></div><LeadForm language={language} source="product-detail" product={product.name} details={`Product: ${product.name}`} /></section>
  </>; }}</SalesShell>;
}
