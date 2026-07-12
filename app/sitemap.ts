import type { MetadataRoute } from "next";
import { productCatalog } from "./catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://dudexa-science-insects.kartaltahaaras.chatgpt.site";
  const staticPaths=["","/knowledge","/planner","/quote","/dealers","/projects","/documents","/legal/privacy","/legal/cookies"];
  const solutionSlugs=["industrial-insect-light-trap","uv-insect-trap"];
  return [
    ...staticPaths.map(path=>({url:`${base}${path}`,changeFrequency:"monthly" as const,priority:path===""?1:.7})),
    ...productCatalog.map(product=>({url:`${base}/products/${product.slug}`,changeFrequency:"monthly" as const,priority:.8})),
    ...["en","tr","zh"].flatMap(locale=>solutionSlugs.map(slug=>({url:`${base}/${locale}/solutions/${slug}`,changeFrequency:"monthly" as const,priority:.75}))),
  ];
}
