import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ProductDetailExperience } from "@/components/ProductDetailExperience";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProductBySlug,
  getProducts,
  getStaticProductSlugs,
} from "@/lib/products";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getStaticProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Feeton Kicks",
    };
  }

  return {
    title: `${product.name} | Feeton Kicks`,
    description: product.supportingNote,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const products = await getProducts();
  const relatedProducts = products.filter((entry) => entry.slug !== product.slug).slice(0, 2);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Navigation />

      <main className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />
          <div className="absolute right-0 top-[20rem] h-[28rem] w-[28rem] rounded-full bg-white/5 blur-[180px]" />
        </div>

        <section className="relative border-b border-white/5 pt-28">
          <div className="container mx-auto px-6 pb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <Link
                  href="/#collections"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.45em] text-white/40 transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return To Archive
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 px-4 py-1 text-[10px] uppercase tracking-[0.4em] text-primary">
                    Chapter 02: Dossier
                  </Badge>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                    {product.category}
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/10 bg-white/[0.03] px-6 text-[10px] font-bold uppercase tracking-[0.35em] hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/#newsletter">
                  Reserve Concierge Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative py-10 md:py-16">
          <div className="container mx-auto px-6">
            <ProductDetailExperience product={product} />
          </div>
        </section>

        <section className="relative py-24">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.45em] text-primary">
                Design Intent
              </div>
              <h2 className="max-w-md text-4xl font-headline font-black uppercase tracking-tight md:text-5xl">
                Built Like A Performance Artifact
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
                {product.story}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-[2rem] border border-white/10 bg-black/25 p-6"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">
                    {spec.label}
                  </div>
                  <div className="mt-4 text-3xl font-headline font-bold tracking-tight text-primary">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/5 py-24">
          <div className="container mx-auto px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-primary">
                  Continue Exploring
                </div>
                <h2 className="mt-4 text-4xl font-headline font-black uppercase tracking-tight md:text-6xl">
                  Adjacent Systems
                </h2>
              </div>
              <Link
                href="/#collections"
                className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40 transition-colors hover:text-primary"
              >
                Open Full Archive
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedProducts.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/products/${entry.slug}`}
                  className="group rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                        {entry.category}
                      </div>
                      <h3 className="mt-4 text-3xl font-headline font-black uppercase tracking-tight transition-colors group-hover:text-primary">
                        {entry.name}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                        {entry.supportingNote}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
