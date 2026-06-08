import { portfolioCompanies } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-5xl font-bold mb-4">Our investments.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            Builders we&apos;ve backed. Problems we believe in.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioCompanies.map((co) => (
              <Link
                key={co.slug}
                href={`/portfolio/${co.slug}`}
                className="group block border border-cream-dark rounded-sm p-6 hover:shadow-md hover:border-gold/40 transition-all"
              >
                <div className="w-12 h-12 bg-forest/10 group-hover:bg-forest rounded-sm flex items-center justify-center mb-4 transition-colors">
                  <span className="text-forest group-hover:text-gold font-bold text-lg transition-colors">
                    {co.name[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="sector">{co.sector}</Badge>
                  <Badge variant="stage">{co.stage}</Badge>
                </div>
                <h3 className="font-bold text-charcoal mb-1 group-hover:text-forest transition-colors">{co.name}</h3>
                <p className="text-muted text-sm mb-4 leading-relaxed">{co.tagline}</p>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="flex items-center gap-1"><MapPin size={11} />{co.location}</span>
                  <span className="flex items-center gap-1 text-forest group-hover:gap-2 transition-all">
                    View <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center text-muted text-sm mt-12">
            Portfolio growing. New investments announced quarterly.
          </p>
        </div>
      </section>
    </div>
  );
}
