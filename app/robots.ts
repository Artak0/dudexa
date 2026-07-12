import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{return{rules:[{userAgent:"*",allow:"/",disallow:["/admin","/api/"]}],sitemap:"https://dudexa-science-insects.kartaltahaaras.chatgpt.site/sitemap.xml"}}
