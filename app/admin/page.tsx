import { env } from "cloudflare:workers";
import Link from "next/link";
import { getAdminIdentity } from "../admin-auth";

export const dynamic = "force-dynamic";

type Lead = { id: number; name: string; email: string; message: string; language: string; source: string; status: string; created_at: string };
type Ranked = { label: string; total: number };

function number(value: number | null | undefined) {
  return new Intl.NumberFormat("tr-TR").format(value || 0);
}

function date(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(`${value.replace(" ", "T")}Z`));
}

export default async function AdminPage() {
  const admin = await getAdminIdentity();
  if (!admin) {
    return (
      <main className="admin-denied">
        <span>DDX<span>•</span></span>
        <p>403 / YETKİ GEREKİYOR</p>
        <h1>Bu alan yalnızca onaylı Dudexa yöneticilerine açık.</h1>
        <Link href="/">Siteye dön ↗</Link>
      </main>
    );
  }

  const [views, visitors, leadCount, interestCount, recentLeads, topProducts, topPages] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS count FROM analytics_events WHERE event_name = 'page_view' AND created_at >= datetime('now', '-30 days')").first<{ count: number }>(),
    env.DB.prepare("SELECT COUNT(DISTINCT session_id) AS count FROM analytics_events WHERE created_at >= datetime('now', '-30 days')").first<{ count: number }>(),
    env.DB.prepare("SELECT COUNT(*) AS count FROM leads WHERE created_at >= datetime('now', '-30 days')").first<{ count: number }>(),
    env.DB.prepare("SELECT COUNT(*) AS count FROM analytics_events WHERE event_name = 'product_interest' AND created_at >= datetime('now', '-30 days')").first<{ count: number }>(),
    env.DB.prepare("SELECT id, name, email, message, language, source, status, created_at FROM leads ORDER BY created_at DESC LIMIT 40").all<Lead>(),
    env.DB.prepare("SELECT COALESCE(product, 'Diğer') AS label, COUNT(*) AS total FROM analytics_events WHERE event_name = 'product_interest' AND created_at >= datetime('now', '-30 days') GROUP BY product ORDER BY total DESC LIMIT 5").all<Ranked>(),
    env.DB.prepare("SELECT path AS label, COUNT(*) AS total FROM analytics_events WHERE event_name = 'page_view' AND created_at >= datetime('now', '-30 days') GROUP BY path ORDER BY total DESC LIMIT 5").all<Ranked>(),
  ]);

  const maxProduct = Math.max(1, ...topProducts.results.map((row) => row.total));
  const conversion = visitors?.count ? ((leadCount?.count || 0) / visitors.count) * 100 : 0;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">DDX<span>•</span></Link>
        <nav><a className="active" href="#overview">Genel bakış</a><a href="#products">Ürün ilgisi</a><a href="#leads">Talepler</a><a href="/" target="_blank">Siteyi aç ↗</a></nav>
        <div><small>Giriş yapan yönetici</small><strong>{admin.name}</strong><span>{admin.email}</span></div>
      </aside>

      <section className="admin-main">
        <header><div><p>DUDEXA / ADMIN MERKEZİ</p><h1>Satış kontrolü,<br /><em>tek bakışta.</em></h1></div><span className="admin-live"><i /> Canlı veri</span></header>

        <section id="overview" className="metric-grid">
          <article><span>01 / Ziyaret</span><strong>{number(views?.count)}</strong><small>Son 30 gün sayfa görüntüleme</small></article>
          <article><span>02 / Ziyaretçi</span><strong>{number(visitors?.count)}</strong><small>Anonim, tekil oturum</small></article>
          <article className="acid"><span>03 / Yeni talep</span><strong>{number(leadCount?.count)}</strong><small>%{conversion.toFixed(1)} ziyaretçi → talep</small></article>
          <article><span>04 / Ürün ilgisi</span><strong>{number(interestCount?.count)}</strong><small>Teklif ve ürün tıklamaları</small></article>
        </section>

        <section className="admin-insights" id="products">
          <article>
            <div className="admin-section-title"><span>ÜRÜN İLGİSİ / 30 GÜN</span><strong>Talebin yönü</strong></div>
            <div className="bar-list">
              {topProducts.results.length ? topProducts.results.map((row, index) => (
                <div key={row.label}><span>0{index + 1}</span><strong>{row.label}</strong><i><b style={{ width: `${(row.total / maxProduct) * 100}%` }} /></i><em>{row.total}</em></div>
              )) : <p className="empty-data">İlk ürün etkileşimleri burada görünecek.</p>}
            </div>
          </article>
          <article>
            <div className="admin-section-title"><span>EN ÇOK GÖRÜLENLER</span><strong>Sayfa trafiği</strong></div>
            <div className="page-list">
              {topPages.results.length ? topPages.results.map((row) => <div key={row.label}><span>{row.label}</span><strong>{number(row.total)}</strong></div>) : <p className="empty-data">Trafik oluştuğunda sayfalar burada sıralanacak.</p>}
            </div>
          </article>
        </section>

        <section className="lead-panel" id="leads">
          <div className="admin-section-title"><span>TALEP HAVUZU</span><strong>Satış fırsatları</strong><small>{recentLeads.results.length} son kayıt</small></div>
          <div className="lead-table-wrap">
            <table>
              <thead><tr><th>Müşteri</th><th>Talep</th><th>Tarih</th><th>Durum</th></tr></thead>
              <tbody>
                {recentLeads.results.map((lead) => (
                  <tr key={lead.id}>
                    <td><strong>{lead.name}</strong><a href={`mailto:${lead.email}`}>{lead.email}</a><small>{lead.language.toUpperCase()} · {lead.source}</small></td>
                    <td><p>{lead.message}</p></td><td>{date(lead.created_at)}</td>
                    <td><form action="/api/admin/leads/status" method="post"><input type="hidden" name="id" value={lead.id} /><select name="status" defaultValue={lead.status} aria-label={`${lead.name} talep durumu`}><option value="new">Yeni</option><option value="contacted">İletişimde</option><option value="qualified">Nitelikli</option><option value="won">Kazanıldı</option><option value="closed">Kapandı</option></select><button type="submit">Kaydet</button></form></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!recentLeads.results.length && <p className="empty-data lead-empty">İletişim formundan gelen ilk talep burada görünecek.</p>}
          </div>
        </section>
      </section>
    </main>
  );
}
