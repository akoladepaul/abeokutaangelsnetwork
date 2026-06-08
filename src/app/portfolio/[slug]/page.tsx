import { portfolioCompanies } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";

export async function generateStaticParams() {
  return portfolioCompanies.map((c) => ({ slug: c.slug }));
}

export default async function PortfolioCompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = portfolioCompanies.find((c) => c.slug === slug);
  if (!company) notFound();

  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/portfolio" className="text-gold text-xs font-semibold uppercase tracking-widest hover:underline">
            ← Portfolio
          </Link>
          <div className="flex items-center gap-4 mt-6 mb-4">
            <div className="w-16 h-16 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-gold text-2xl font-bold">{company.name[0]}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="sector">{company.sector}</Badge>
                <Badge variant="stage">{company.stage}</Badge>
              </div>
              <h1 className="text-4xl font-bold">{company.name}</h1>
            </div>
          </div>
          <p className="text-cream/70 text-xl max-w-2xl">{company.tagline}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">About</p>
                <p className="text-charcoal/80 leading-relaxed">{company.description}</p>
              </div>
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">The Problem</p>
                <p className="text-charcoal/80 leading-relaxed">{company.problem}</p>
              </div>
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">The Team</p>
                <p className="text-charcoal/80 leading-relaxed">{company.team}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-cream border border-cream-dark rounded-sm p-6">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Metrics</p>
                {Object.entries(company.metrics).map(([k, v]) => (
                  <div key={k} className="py-2.5 border-b border-cream-dark last:border-0">
                    <p className="text-xs text-muted uppercase tracking-wider mb-0.5">{k}</p>
                    <p className="font-medium text-charcoal text-sm">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-cream border border-cream-dark rounded-sm p-6">
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">Location</p>
                <div className="flex items-center gap-1.5 text-charcoal font-medium text-sm">
                  <MapPin size={13} />
                  {company.location}
                </div>
                <p className="text-xs text-muted uppercase tracking-wider mt-3 mb-0.5">Year Invested</p>
                <p className="font-medium text-charcoal text-sm">{company.year}</p>
              </div>
              {company.website !== "#" && (
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    Visit Website <ExternalLink size={13} />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
