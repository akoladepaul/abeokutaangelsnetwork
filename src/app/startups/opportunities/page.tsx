import { opportunities } from "@/data/content";
import { ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const typeColors: Record<string, string> = {
  Grant: "bg-green-50 text-green-700 border-green-200",
  Accelerator: "bg-blue-50 text-blue-700 border-blue-200",
  Competition: "bg-purple-50 text-purple-700 border-purple-200",
  Fellowship: "bg-amber-50 text-amber-700 border-amber-200",
  Programme: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export default function OpportunitiesPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Opportunities</p>
          <h1 className="text-5xl font-bold mb-4">Funding beyond AAN.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            Grants, accelerators, competitions, and fellowships for Ogun State and
            Nigerian founders. Curated by the AAN team.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="flex flex-col sm:flex-row gap-5 p-6 border border-cream-dark rounded-sm hover:shadow-md hover:border-gold/30 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColors[opp.type] ?? "bg-cream-dark text-charcoal border-cream-dark"}`}>
                      {opp.type}
                    </span>
                    {opp.tags.slice(1).map((tag) => (
                      <span key={tag} className="text-xs text-muted bg-cream px-2 py-0.5 rounded-full border border-cream-dark">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-charcoal mb-0.5">{opp.title}</h3>
                  <p className="text-xs text-muted mb-3">{opp.organisation}</p>
                  <p className="text-sm font-medium text-forest mb-1">{opp.funding}</p>
                  <p className="text-xs text-charcoal/70 mb-3">{opp.eligibility}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Calendar size={12} />
                    <span>{opp.deadline}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end justify-between gap-3">
                  <a
                    href={opp.link}
                    target={opp.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:underline"
                  >
                    Apply <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-cream border border-cream-dark rounded-sm p-8 text-center">
            <h3 className="font-bold text-charcoal mb-2">Know an opportunity we should list?</h3>
            <p className="text-muted text-sm mb-5">
              We keep this list updated for Ogun State founders. Share grants and programmes we may have missed.
            </p>
            <Link href="/contact">
              <Button variant="outline">Suggest an Opportunity</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
