"use client";

import { trackEvent } from "../analytics-client";
import { verifiedDocumentLinks } from "../catalog";
import { SalesShell } from "../components/sales-shell";

export default function DocumentsPage(){return <SalesShell>{language=>{const c={tr:{title:"Doğrulanmış teknik dokümanlar.",desc:"Yayımlanmış Dudexa kullanım kılavuzlarını doğrudan açın. Yeni dokümanlar doğrulandıkça bu merkez büyür.",open:"Dokümanı aç"},en:{title:"Verified technical documents.",desc:"Open published Dudexa manuals directly. This center grows as new documents are verified.",open:"Open document"},zh:{title:"已验证的技术资料。",desc:"直接查看已发布的 Dudexa 使用手册；新的资料经验证后将持续加入。",open:"打开资料"}}[language];return <><section className="feature-hero"><span className="sales-kicker">Technical library</span><h1>{c.title}</h1><p>{c.desc}</p></section><section className="sales-section"><div className="document-list-sales">{verifiedDocumentLinks.map((doc,index)=><article className="document-row" key={doc.href}><span>0{index+1}</span><div><strong>{doc.title}</strong><small>{doc.product} · {doc.type} · {doc.language} · PDF</small></div><a href={doc.href} target="_blank" rel="noreferrer" onClick={()=>trackEvent("document_opened",{language,product:doc.product,path:"/documents"})}>{c.open} ↗</a></article>)}</div></section></>}}</SalesShell>}
