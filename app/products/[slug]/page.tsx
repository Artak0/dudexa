import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, productCatalog } from "../../catalog";
import ProductDetailClient from "./product-detail-client";

export function generateStaticParams() { return productCatalog.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `Dudexa ${product.name} — Insect Light Trap`, description: product.summary.en, alternates: { canonical: `/products/${product.slug}` } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
