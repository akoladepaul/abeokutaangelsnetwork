import { opportunities } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, DollarSign } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  Grant: "bg-forest/10 text-forest border-forest/20",
  Accelerator: "bg-gold/10 text-gold border-gold/20",
  Competition: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function StartupOpportunitiesPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Opportunities</p>
        <h1 className="text-3xl font-bold text-charcoal">Grants, Accelerators & Competitions</h1>
        <p className="text-muted text-sm mt-1">
          Curated funding and growth opportunities for AAN-network startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-white border border-cream-dark rounded-sm p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${TYPE_COLORS[opp.type] ?? "bg-cream text-muted border-cream-dark"}`}>
                  {opp.type}
                </span>
                <h3 className="font-semibold text-charcoal mt-2 leading-snug">{opp.title}</h3>
                <p className="text-muted text-xs mt-0.5">{opp.organisation}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-muted">
              <div className="flex items-center gap-2">
                <DollarSign size={12} className="text-gold flex-shrink-0" />
                <span>{opp.funding}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-gold flex-shrink-0" />
                <span>{opp.deadline}</span>
              </div>
            </div>

            <p className="text-xs text-muted">{opp.eligibility}</p>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {opp.tags.map((tag) => (
                <Badge key={tag} variant="sector">{tag}</Badge>
              ))}
            </div>

            <a
              href={opp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-forest font-medium hover:underline mt-1"
            >
              <ExternalLink size={12} /> Learn more & Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
