import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productCatalog } from "../../../catalog";

const locales=["en","tr","zh"] as const;
const solutions={
  "industrial-insect-light-trap":{
    products:["prolit","pro202"],
    en:{title:"Industrial insect light traps for demanding facilities",description:"Plan UV-A glue-board insect light traps for food production, warehouses and commercial hygiene programs."},
    tr:{title:"Zorlu tesisler için endüstriyel sinek yakalama cihazları",description:"Gıda üretimi, depo ve ticari hijyen programları için UV-A yapışkan levhalı cihazları planlayın."},
    zh:{title:"适用于严苛设施的工业级飞虫诱捕灯",description:"为食品生产、仓储及商业卫生项目规划 UV-A 粘虫板诱捕设备。"},
  },
  "uv-insect-trap":{
    products:["mood","magnet","fli-x"],
    en:{title:"Professional UV insect traps with discreet capture",description:"Compare wall-mounted Dudexa UV-A insect traps for hospitality, retail and commercial environments."},
    tr:{title:"Gizli yakalama sağlayan profesyonel UV sinek tuzakları",description:"Otel, perakende ve ticari alanlar için duvar tipi Dudexa UV-A cihazlarını karşılaştırın."},
    zh:{title:"隐蔽捕获的专业 UV 飞虫诱捕灯",description:"比较适用于酒店、零售和商业环境的 Dudexa 壁挂式 UV-A 诱捕设备。"},
  },
} as const;

export function generateStaticParams(){return locales.flatMap(locale=>Object.keys(solutions).map(slug=>({locale,slug})))}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{const {locale,slug}=await params;const item=solutions[slug as keyof typeof solutions];if(!item||!locales.includes(locale as typeof locales[number]))return{};const copy=item[locale as typeof locales[number]];return{title:`${copy.title} — Dudexa`,description:copy.description,alternates:{canonical:`/${locale}/solutions/${slug}`,languages:{en:`/en/solutions/${slug}`,tr:`/tr/solutions/${slug}`,"zh-CN":`/zh/solutions/${slug}`}}}}
export default async function LocalizedSolution({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;const item=solutions[slug as keyof typeof solutions];if(!item||!locales.includes(locale as typeof locales[number]))notFound();const lang=locale as typeof locales[number];const copy=item[lang];const products=productCatalog.filter(p=>(item.products as readonly string[]).includes(p.slug));const labels={en:{products:"Products",planner:"Coverage planner",quote:"Request quote",view:"View product",plan:"Plan your space"},tr:{products:"Ürünler",planner:"Alan planlayıcı",quote:"Teklif iste",view:"Ürünü incele",plan:"Alanınızı planlayın"},zh:{products:"产品",planner:"覆盖规划",quote:"申请报价",view:"查看产品",plan:"规划您的空间"}}[lang];return <main className="sales-page"><header className="sales-nav"><Link className="brand" href="/">DDX<span>•</span></Link><nav><Link href="/#products">{labels.products}</Link><Link href="/planner">{labels.planner}</Link></nav><Link className="sales-contact" href="/quote">{labels.quote} ↗</Link></header><section className="feature-hero"><span className="sales-kicker">Dudexa / {lang.toUpperCase()}</span><h1>{copy.title}</h1><p>{copy.description}</p></section><section className="sales-section"><div className="card-grid">{products.map(product=><article className="seo-card" key={product.slug}><img src={product.image} alt={`Dudexa ${product.name}`} style={{width:"100%",height:"220px",objectFit:"contain"}}/><h2>{product.name}</h2><p>{product.summary[lang]}</p><Link className="sales-button" href={`/products/${product.slug}`}>{labels.view} ↗</Link></article>)}</div></section><section className="seo-cta"><h2>{labels.plan}</h2><Link className="sales-button" href="/planner">{labels.planner} ↗</Link></section></main>}
