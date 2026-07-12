import type { Language, ProductId } from "./content";

export type ProductSlug = "mood" | "magnet" | "pro202" | "fli-x" | "prolit";

type LocalText = Record<Language, string>;

export type ProductRecord = {
  slug: ProductSlug;
  name: ProductId;
  image: string;
  mounting: "wall" | "ceiling";
  lamp: string;
  material: string;
  dimensions: string;
  board: string;
  planningCoverage: number;
  use: LocalText;
  summary: LocalText;
};

export const productCatalog: ProductRecord[] = [
  {
    slug: "mood", name: "Mood", image: "/dudexa-mood.jpg", mounting: "wall", lamp: "2 × 15W UV-A", material: "Stainless steel", dimensions: "Sales confirmation", board: "24.5 × 42.5 cm", planningCoverage: 60,
    use: { en: "Hotels, restaurants and guest-facing interiors", tr: "Otel, restoran ve misafir alanları", zh: "酒店、餐厅及宾客区域" },
    summary: { en: "A discreet wall-mounted trap where aesthetics matter as much as performance.", tr: "Estetik ile performansın aynı ölçüde önemli olduğu alanlar için duvar tipi çözüm.", zh: "兼顾外观与性能的隐蔽壁挂式诱捕灯。" },
  },
  {
    slug: "magnet", name: "Magnet", image: "/dudexa-magnet.jpg", mounting: "wall", lamp: "2 × 15W UV-A", material: "304 stainless steel", dimensions: "46 × 27 × 10 cm", board: "21.5 × 42 cm", planningCoverage: 80,
    use: { en: "Professional kitchens, retail and service corridors", tr: "Profesyonel mutfak, perakende ve servis koridorları", zh: "专业厨房、零售及服务通道" },
    summary: { en: "Robust stainless-steel construction for dependable everyday control.", tr: "Kesintisiz günlük kontrol için dayanıklı paslanmaz çelik gövde.", zh: "坚固不锈钢机身，适合稳定的日常虫害控制。" },
  },
  {
    slug: "pro202", name: "Pro202", image: "/dudexa-pro202.jpg", mounting: "ceiling", lamp: "2 × 18W UV-A", material: "Metal body", dimensions: "65 × 30 × 14 cm", board: "30 × 60 cm", planningCoverage: 100,
    use: { en: "Retail, warehouses and high-traffic commercial areas", tr: "Perakende, depo ve yoğun ticari alanlar", zh: "零售、仓储及高流量商业区域" },
    summary: { en: "A suspended format that exposes both attraction faces across open rooms.", tr: "Açık alanlarda iki çekim yüzeyini de kullanan tavana asılı format.", zh: "吊装结构，可在开阔空间充分利用双面吸引区域。" },
  },
  {
    slug: "fli-x", name: "Fli-X", image: "/dudexa-flix.jpg", mounting: "wall", lamp: "2 × 15W UV-A", material: "Painted aluminium", dimensions: "Sales confirmation", board: "30 × 39 cm", planningCoverage: 70,
    use: { en: "Commercial back-of-house and service areas", tr: "Ticari arka alanlar ve servis bölümleri", zh: "商业后场及服务区域" },
    summary: { en: "A practical aluminium platform for flexible professional placement.", tr: "Esnek profesyonel yerleşim için pratik alüminyum platform.", zh: "便于灵活专业部署的实用铝制平台。" },
  },
  {
    slug: "prolit", name: "Prolit", image: "/dudexa-prolit.jpg", mounting: "wall", lamp: "2 × 18W UV-A", material: "304 stainless steel", dimensions: "Sales confirmation", board: "Sales confirmation", planningCoverage: 120,
    use: { en: "Food production, logistics and demanding industrial zones", tr: "Gıda üretimi, lojistik ve zorlu endüstriyel alanlar", zh: "食品生产、物流及严苛工业区域" },
    summary: { en: "Industrial stainless-steel control for demanding hygiene programs.", tr: "Zorlu hijyen programları için endüstriyel paslanmaz çelik çözüm.", zh: "面向严格卫生管理项目的工业级不锈钢解决方案。" },
  },
];

export function getProduct(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export const verifiedDocumentLinks = [
  { title: "Dudexa Magnet User Manual", language: "TR", type: "User manual", href: "https://www.dudexa.com/_files/ugd/2fd8bf_360d7aa0790f4aeeb4e7995d6d3f6b99.pdf", product: "Magnet" },
  { title: "Dudexa Pro202 User Manual", language: "TR", type: "User manual", href: "https://www.dudexa.com/_files/ugd/2fd8bf_431b7f46226d4d3286f6c1203cd639b7.pdf", product: "Pro202" },
] as const;
