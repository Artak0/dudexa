import type { Language, ProductId } from "../content";

export type FinderChoice = "hospitality" | "retail" | "industrial";

type KnowledgeCopy = {
  nav: { home: string; products: string; knowledge: string; contact: string };
  hero: { eyebrow: string; title: string; description: string; sourceNote: string };
  index: Array<{ href: string; number: string; title: string; detail: string }>;
  finder: {
    label: string; title: string; description: string; resultLabel: string; quote: string;
    options: Record<FinderChoice, { title: string; detail: string; recommendation: string }>;
  };
  comparison: {
    label: string; title: string; description: string;
    headers: { product: string; mounting: string; lamp: string; detail: string; price: string; stock: string };
    contact: string;
    rows: Record<ProductId, { mounting: string; lamp: string; detail: string }>;
  };
  placement: { label: string; title: string; description: string; items: Array<{ number: string; title: string; detail: string }> };
  maintenance: { label: string; title: string; items: Array<{ timing: string; title: string; detail: string }> };
  boards: { label: string; title: string; description: string; models: Array<{ model: string; size: string; detail: string }> };
  documents: { label: string; title: string; description: string; open: string; items: Array<{ title: string; meta: string; href: string }> };
  faq: { label: string; title: string; items: Array<{ question: string; answer: string }> };
  cta: { label: string; title: string; description: string; action: string };
  footer: { home: string; email: string; statement: string };
};

export const knowledgeCopy: Record<Language, KnowledgeCopy> = {
  en: {
    nav: { home: "Home", products: "Products", knowledge: "Knowledge", contact: "Contact" },
    hero: {
      eyebrow: "Verified product information",
      title: "Knowledge Center",
      description: "Choose a product, compare verified specifications, plan installation and reach Dudexa’s official technical documents from one place.",
      sourceNote: "Based on Dudexa product pages and official user manuals.",
    },
    index: [
      { href: "#finder", number: "01", title: "Product finder", detail: "Start with your environment" },
      { href: "#compare", number: "02", title: "Compare", detail: "Review published specifications" },
      { href: "#placement", number: "03", title: "Placement", detail: "Plan an effective position" },
      { href: "#documents", number: "04", title: "Documents", detail: "Open official resources" },
    ],
    finder: {
      label: "Product finder", title: "Where will the trap work?", description: "Choose the closest environment to see a practical starting point.", resultLabel: "Suggested starting point", quote: "Request a quote",
      options: {
        hospitality: { title: "Hospitality / guest areas", detail: "A discreet wall-mounted format matters.", recommendation: "Mood or Magnet" },
        retail: { title: "Retail / suspended installation", detail: "A ceiling-hung format is preferred.", recommendation: "Pro202" },
        industrial: { title: "Commercial / industrial", detail: "Durable, high-capacity construction matters.", recommendation: "Fli-X or Prolit" },
      },
    },
    comparison: {
      label: "Product comparison", title: "Five formats. One clear view.", description: "Only specifications published by Dudexa are shown. Price and availability are confirmed directly by the team.",
      headers: { product: "Product", mounting: "Mounting", lamp: "UV-A lamps", detail: "Published detail", price: "Price", stock: "Availability" }, contact: "Contact us",
      rows: {
        Mood: { mounting: "Wall mounted", lamp: "2 × 15W", detail: "Stainless steel" },
        Magnet: { mounting: "Wall mounted", lamp: "2 × T8 15W", detail: "215 × 420 mm glue board" },
        Pro202: { mounting: "Ceiling suspended", lamp: "2 × T8 18W", detail: "30 × 60 cm glue board" },
        "Fli-X": { mounting: "Wall mounted", lamp: "2 × 15W", detail: "Painted aluminium" },
        Prolit: { mounting: "Industrial", lamp: "2 × 18W", detail: "304 stainless steel" },
      },
    },
    placement: {
      label: "Placement guide", title: "Guide insects away from sensitive areas.", description: "Product-specific manuals take priority over general guidance.",
      items: [
        { number: "01", title: "Magnet at eye level", detail: "The Magnet manual recommends approximately 1.5–1.75 m above the floor." },
        { number: "02", title: "Pro202 up to 2 m", detail: "The Pro202 manual recommends suspending the unit no higher than 2 m where practical." },
        { number: "03", title: "Reduce competing light", detail: "Keep units as far as practical from windows, opening doors and strong daylight." },
        { number: "04", title: "Protect food zones", detail: "Do not position a trap directly above exposed food preparation areas." },
      ],
    },
    maintenance: {
      label: "Maintenance rhythm", title: "Simple habits protect performance.",
      items: [
        { timing: "Daily operation", title: "Keep the unit running", detail: "Official manuals recommend continuous 24-hour operation for maximum performance." },
        { timing: "Routine check", title: "Inspect the glue board", detail: "Check capture load and replace the board safely when it is dirty or losing capacity." },
        { timing: "Every year", title: "Replace UV-A lamps", detail: "UV output falls over time even while the lamp still appears to work." },
        { timing: "Before service", title: "Disconnect power", detail: "Always isolate the unit from its power source before lamp or board replacement." },
      ],
    },
    boards: {
      label: "Glue board formats", title: "UV-treated, high-tack capture surfaces.", description: "Dudexa publishes two named formats with dimensions.",
      models: [
        { model: "3060", size: "30 × 60 cm", detail: "UV-treated glue · high tackiness · long life" },
        { model: "3054", size: "30 × 54 cm", detail: "UV-treated glue · high tackiness · long life" },
      ],
    },
    documents: {
      label: "Official documents", title: "Open the source, not a summary.", description: "Direct links to Dudexa’s own technical and educational resources.", open: "Open",
      items: [
        { title: "Magnet user manual", meta: "Turkish · PDF", href: "https://www.dudexa.com/_files/ugd/2fd8bf_360d7aa0790f4aeeb4e7995d6d3f6b99.pdf" },
        { title: "Pro202 user manual", meta: "Turkish · PDF", href: "https://www.dudexa.com/_files/ugd/2fd8bf_431b7f46226d4d3286f6c1203cd639b7.pdf" },
        { title: "Technical documents", meta: "Dudexa resource page", href: "https://www.dudexa.com/tds" },
        { title: "Placement principles", meta: "Dudexa article", href: "https://www.dudexa.com/post/the-new-safety-regulations" },
      ],
    },
    faq: {
      label: "FAQ", title: "The useful answers first.",
      items: [
        { question: "Which type of UV lamp is used?", answer: "Published Magnet and Pro202 manuals specify T8 UV-A lamps. The Magnet manual explicitly warns against UV-B or UV-C lamps." },
        { question: "How often should lamps be replaced?", answer: "Dudexa recommends annual replacement because UV output decreases with time." },
        { question: "Should the trap run all day?", answer: "The product manuals recommend 24-hour operation for maximum performance." },
        { question: "Where should a trap not be installed?", answer: "Avoid direct placement above exposed food, strong heat or moisture sources, and positions dominated by daylight." },
        { question: "How do I learn price and availability?", answer: "Contact Dudexa with the product name, intended environment and quantity." },
      ],
    },
    cta: { label: "Need a confirmed answer?", title: "Ask Dudexa’s technical team.", description: "Share your environment, preferred mounting and quantity for a product-specific response.", action: "Contact us" },
    footer: { home: "Home", email: "Email", statement: "Verified guidance for better product decisions." },
  },
  tr: {
    nav: { home: "Ana Sayfa", products: "Ürünler", knowledge: "Bilgi Merkezi", contact: "İletişim" },
    hero: {
      eyebrow: "Doğrulanmış ürün bilgileri",
      title: "Bilgi Merkezi",
      description: "Ürün seçimini yapın, yayımlanmış teknik özellikleri karşılaştırın, yerleşimi planlayın ve Dudexa’nın resmî dokümanlarına tek noktadan ulaşın.",
      sourceNote: "Dudexa ürün sayfaları ve resmî kullanım kılavuzları temel alınmıştır.",
    },
    index: [
      { href: "#finder", number: "01", title: "Ürün bulucu", detail: "Ortamınızla başlayın" },
      { href: "#compare", number: "02", title: "Karşılaştırma", detail: "Yayımlanmış özellikleri inceleyin" },
      { href: "#placement", number: "03", title: "Yerleşim", detail: "Etkili konumu planlayın" },
      { href: "#documents", number: "04", title: "Dokümanlar", detail: "Resmî kaynakları açın" },
    ],
    finder: {
      label: "Ürün bulucu", title: "Cihaz nerede çalışacak?", description: "Pratik bir başlangıç önerisi için ortamınıza en yakın seçeneği seçin.", resultLabel: "Önerilen başlangıç", quote: "Teklif isteyin",
      options: {
        hospitality: { title: "Konaklama / müşteri alanları", detail: "Göze batmayan, duvara monte bir format önemli.", recommendation: "Mood veya Magnet" },
        retail: { title: "Perakende / tavana asma", detail: "Tavana asılan bir format tercih ediliyor.", recommendation: "Pro202" },
        industrial: { title: "Ticari / endüstriyel", detail: "Dayanıklı ve yüksek kapasiteli yapı önemli.", recommendation: "Fli-X veya Prolit" },
      },
    },
    comparison: {
      label: "Ürün karşılaştırma", title: "Beş format. Tek bakış.", description: "Yalnızca Dudexa’nın yayımladığı özellikler gösterilir. Fiyat ve stok bilgisi ekip tarafından doğrudan doğrulanır.",
      headers: { product: "Ürün", mounting: "Montaj", lamp: "UV-A lambalar", detail: "Yayımlanan detay", price: "Fiyat", stock: "Stok" }, contact: "Bize ulaşın",
      rows: {
        Mood: { mounting: "Duvara monte", lamp: "2 × 15W", detail: "Paslanmaz çelik" },
        Magnet: { mounting: "Duvara monte", lamp: "2 × T8 15W", detail: "215 × 420 mm yapışkan plaka" },
        Pro202: { mounting: "Tavana asılı", lamp: "2 × T8 18W", detail: "30 × 60 cm yapışkan plaka" },
        "Fli-X": { mounting: "Duvara monte", lamp: "2 × 15W", detail: "Boyalı alüminyum" },
        Prolit: { mounting: "Endüstriyel", lamp: "2 × 18W", detail: "304 paslanmaz çelik" },
      },
    },
    placement: {
      label: "Yerleşim rehberi", title: "Böcekleri hassas alanlardan uzağa yönlendirin.", description: "Ürüne özel kullanım kılavuzları genel önerilerden önceliklidir.",
      items: [
        { number: "01", title: "Magnet göz hizasında", detail: "Magnet kılavuzu yerden yaklaşık 1,5–1,75 m yüksekliği öneriyor." },
        { number: "02", title: "Pro202 en fazla 2 m", detail: "Pro202 kılavuzu, mümkün olduğunda cihazın yerden en fazla 2 m yüksekliğe asılmasını öneriyor." },
        { number: "03", title: "Rakip ışığı azaltın", detail: "Cihazları pencere, açılan kapı ve güçlü gün ışığından mümkün olduğunca uzağa yerleştirin." },
        { number: "04", title: "Gıda alanlarını koruyun", detail: "Cihazı açık gıda hazırlama alanlarının doğrudan üzerine yerleştirmeyin." },
      ],
    },
    maintenance: {
      label: "Bakım ritmi", title: "Basit alışkanlıklar performansı korur.",
      items: [
        { timing: "Günlük çalışma", title: "Cihazı çalışır tutun", detail: "Resmî kılavuzlar maksimum performans için 24 saat kesintisiz çalışmayı öneriyor." },
        { timing: "Rutin kontrol", title: "Yapışkan plakayı inceleyin", detail: "Yakalama yoğunluğunu kontrol edin; plaka kirlendiğinde veya kapasitesi azaldığında güvenle değiştirin." },
        { timing: "Her yıl", title: "UV-A lambaları değiştirin", detail: "Lamba çalışıyor görünse bile UV çıkışı zamanla azalır." },
        { timing: "Servis öncesi", title: "Elektriği kesin", detail: "Lamba veya plaka değişiminden önce cihazı mutlaka elektrik kaynağından ayırın." },
      ],
    },
    boards: {
      label: "Yapışkan plaka formatları", title: "UV işlemli, yüksek yapışkanlı yakalama yüzeyleri.", description: "Dudexa ölçüleri yayımlanmış iki model sunuyor.",
      models: [
        { model: "3060", size: "30 × 60 cm", detail: "UV işlemli tutkal · yüksek yapışkanlık · uzun ömür" },
        { model: "3054", size: "30 × 54 cm", detail: "UV işlemli tutkal · yüksek yapışkanlık · uzun ömür" },
      ],
    },
    documents: {
      label: "Resmî dokümanlar", title: "Özeti değil, kaynağı açın.", description: "Dudexa’nın kendi teknik ve eğitici kaynaklarına doğrudan bağlantılar.", open: "Aç",
      items: [
        { title: "Magnet kullanım kılavuzu", meta: "Türkçe · PDF", href: "https://www.dudexa.com/_files/ugd/2fd8bf_360d7aa0790f4aeeb4e7995d6d3f6b99.pdf" },
        { title: "Pro202 kullanım kılavuzu", meta: "Türkçe · PDF", href: "https://www.dudexa.com/_files/ugd/2fd8bf_431b7f46226d4d3286f6c1203cd639b7.pdf" },
        { title: "Teknik dokümanlar", meta: "Dudexa kaynak sayfası", href: "https://www.dudexa.com/tds" },
        { title: "Yerleşim prensipleri", meta: "Dudexa makalesi", href: "https://www.dudexa.com/post/the-new-safety-regulations" },
      ],
    },
    faq: {
      label: "Sık sorulan sorular", title: "Önce işe yarayan cevaplar.",
      items: [
        { question: "Hangi tip UV lamba kullanılıyor?", answer: "Yayımlanmış Magnet ve Pro202 kılavuzları T8 UV-A lambaları belirtiyor. Magnet kılavuzu UV-B veya UV-C kullanılmaması gerektiğini açıkça söylüyor." },
        { question: "Lambalar ne sıklıkla değiştirilmeli?", answer: "Dudexa, UV çıkışı zamanla azaldığı için yılda bir değişim öneriyor." },
        { question: "Cihaz bütün gün çalışmalı mı?", answer: "Ürün kılavuzları maksimum performans için 24 saat çalışmayı öneriyor." },
        { question: "Cihaz nereye takılmamalı?", answer: "Açık gıdanın doğrudan üstünden, güçlü ısı/nem kaynaklarından ve yoğun gün ışığı alan konumlardan kaçının." },
        { question: "Fiyat ve stok bilgisini nasıl öğrenirim?", answer: "Ürün adı, kullanılacak ortam ve adet bilgisiyle Dudexa’ya ulaşın." },
      ],
    },
    cta: { label: "Kesin bir yanıt mı gerekiyor?", title: "Dudexa teknik ekibine sorun.", description: "Ürüne özel yanıt için ortamınızı, montaj tercihinizi ve adedi paylaşın.", action: "Bize ulaşın" },
    footer: { home: "Ana Sayfa", email: "E-posta", statement: "Daha doğru ürün kararları için doğrulanmış bilgiler." },
  },
  zh: {
    nav: { home: "首页", products: "产品", knowledge: "知识中心", contact: "联系我们" },
    hero: {
      eyebrow: "已验证的产品信息", title: "知识中心",
      description: "选择产品、比较已发布的技术参数、规划安装位置，并在一个页面中访问 Dudexa 官方技术文件。",
      sourceNote: "内容基于 Dudexa 产品页面与官方用户手册。",
    },
    index: [
      { href: "#finder", number: "01", title: "产品选择", detail: "从使用环境开始" },
      { href: "#compare", number: "02", title: "产品比较", detail: "查看已发布参数" },
      { href: "#placement", number: "03", title: "安装位置", detail: "规划有效位置" },
      { href: "#documents", number: "04", title: "技术文件", detail: "打开官方资源" },
    ],
    finder: {
      label: "产品选择", title: "设备将用于哪里？", description: "选择最接近的使用环境，获取初步建议。", resultLabel: "建议起点", quote: "索取报价",
      options: {
        hospitality: { title: "酒店餐饮 / 客户区域", detail: "需要低调的壁挂式外观。", recommendation: "Mood 或 Magnet" },
        retail: { title: "零售 / 吊装", detail: "偏好吊装式设备。", recommendation: "Pro202" },
        industrial: { title: "商业 / 工业", detail: "注重坚固和高容量结构。", recommendation: "Fli-X 或 Prolit" },
      },
    },
    comparison: {
      label: "产品比较", title: "五种形式，一目了然。", description: "仅展示 Dudexa 已发布的信息。价格与库存由团队直接确认。",
      headers: { product: "产品", mounting: "安装方式", lamp: "UV-A 灯管", detail: "已发布信息", price: "价格", stock: "库存" }, contact: "联系我们",
      rows: {
        Mood: { mounting: "壁挂式", lamp: "2 × 15W", detail: "不锈钢" },
        Magnet: { mounting: "壁挂式", lamp: "2 × T8 15W", detail: "215 × 420 mm 粘虫板" },
        Pro202: { mounting: "吊装式", lamp: "2 × T8 18W", detail: "30 × 60 cm 粘虫板" },
        "Fli-X": { mounting: "壁挂式", lamp: "2 × 15W", detail: "喷涂铝材" },
        Prolit: { mounting: "工业级", lamp: "2 × 18W", detail: "304 不锈钢" },
      },
    },
    placement: {
      label: "安装指南", title: "将飞虫引离敏感区域。", description: "产品专用手册应优先于一般建议。",
      items: [
        { number: "01", title: "Magnet 安装于视线高度", detail: "Magnet 手册建议离地约 1.5–1.75 米。" },
        { number: "02", title: "Pro202 不高于 2 米", detail: "Pro202 手册建议在条件允许时，吊装高度不超过 2 米。" },
        { number: "03", title: "减少竞争光源", detail: "设备应尽可能远离窗户、开启的门和强烈日光。" },
        { number: "04", title: "保护食品区域", detail: "不要将设备直接安装在暴露食品的加工区域上方。" },
      ],
    },
    maintenance: {
      label: "维护周期", title: "简单习惯，保持性能。",
      items: [
        { timing: "日常运行", title: "保持设备运行", detail: "官方手册建议全天 24 小时运行，以获得最佳性能。" },
        { timing: "定期检查", title: "检查粘虫板", detail: "检查捕获量；粘虫板变脏或容量降低时安全更换。" },
        { timing: "每年", title: "更换 UV-A 灯管", detail: "即使灯管仍然发光，UV 输出也会随时间降低。" },
        { timing: "维护前", title: "切断电源", detail: "更换灯管或粘虫板前，务必断开设备电源。" },
      ],
    },
    boards: {
      label: "粘虫板规格", title: "UV 处理、高粘性的捕获表面。", description: "Dudexa 发布了两种带尺寸的型号。",
      models: [
        { model: "3060", size: "30 × 60 cm", detail: "UV 处理胶 · 高粘性 · 长寿命" },
        { model: "3054", size: "30 × 54 cm", detail: "UV 处理胶 · 高粘性 · 长寿命" },
      ],
    },
    documents: {
      label: "官方文件", title: "直接查看原始资料。", description: "直接访问 Dudexa 官方技术与教育资源。", open: "打开",
      items: [
        { title: "Magnet 用户手册", meta: "土耳其语 · PDF", href: "https://www.dudexa.com/_files/ugd/2fd8bf_360d7aa0790f4aeeb4e7995d6d3f6b99.pdf" },
        { title: "Pro202 用户手册", meta: "土耳其语 · PDF", href: "https://www.dudexa.com/_files/ugd/2fd8bf_431b7f46226d4d3286f6c1203cd639b7.pdf" },
        { title: "技术文件", meta: "Dudexa 资源页面", href: "https://www.dudexa.com/tds" },
        { title: "安装原则", meta: "Dudexa 文章", href: "https://www.dudexa.com/post/the-new-safety-regulations" },
      ],
    },
    faq: {
      label: "常见问题", title: "先给出实用答案。",
      items: [
        { question: "使用哪种 UV 灯管？", answer: "已发布的 Magnet 与 Pro202 手册指定 T8 UV-A 灯管。Magnet 手册明确警告不要使用 UV-B 或 UV-C 灯管。" },
        { question: "多久更换一次灯管？", answer: "由于 UV 输出会随时间降低，Dudexa 建议每年更换。" },
        { question: "设备应全天运行吗？", answer: "产品手册建议全天 24 小时运行，以获得最佳性能。" },
        { question: "哪些位置不适合安装？", answer: "避免直接安装在暴露食品上方、强热源或潮湿源附近，以及日光强烈的位置。" },
        { question: "如何了解价格与库存？", answer: "请提供产品名称、使用环境和数量并联系 Dudexa。" },
      ],
    },
    cta: { label: "需要确认答案？", title: "咨询 Dudexa 技术团队。", description: "请提供使用环境、安装偏好和数量，以获得产品专属答复。", action: "联系我们" },
    footer: { home: "首页", email: "邮件", statement: "用可靠信息做出更好的产品决定。" },
  },
};
