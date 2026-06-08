import { Badge } from "@/components/ui/badge";

const portfolio = [
  { name: "Placeholder Co.", sector: "AgriTech", stage: "Pre-seed", year: 2024, description: "Supply chain solutions for smallholder farmers in Ogun State.", location: "Abeokuta" },
  { name: "EduBuild NG", sector: "EdTech", stage: "Seed", year: 2024, description: "Vocational skills platform connecting Ogun State youth to certified trades.", location: "Abeokuta" },
  { name: "PayLocal", sector: "FinTech", stage: "Pre-seed", year: 2024, description: "Agent banking and mobile payments for underserved secondary cities.", location: "Sagamu" },
];

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
            {portfolio.map((co) => (
              <div key={co.name} className="border border-cream-dark rounded-sm p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-forest/10 rounded-sm flex items-center justify-center mb-4">
                  <span className="text-forest font-bold text-lg">{co.name[0]}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="sector">{co.sector}</Badge>
                  <Badge variant="stage">{co.stage}</Badge>
                </div>
                <h3 className="font-bold text-charcoal mb-1">{co.name}</h3>
                <p className="text-muted text-sm mb-3 leading-relaxed">{co.description}</p>
                <p className="text-xs text-muted">{co.location} · {co.year}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted text-sm mt-12">
            Portfolio is growing. New investments announced quarterly.
          </p>
        </div>
      </section>
    </div>
  );
}
