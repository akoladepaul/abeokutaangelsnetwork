import { Leaf, GraduationCap, CreditCard, Truck, HeartPulse, Palette } from "lucide-react";

const sectors = [
  { Icon: Leaf, name: "AgriTech", description: "Farm-to-market, precision ag, supply chain" },
  { Icon: GraduationCap, name: "EdTech", description: "Learning tools, skills, university-linked" },
  { Icon: CreditCard, name: "FinTech", description: "Payments, savings, financial inclusion" },
  { Icon: Truck, name: "Logistics", description: "Last-mile, freight, proximity to Lagos" },
  { Icon: HeartPulse, name: "HealthTech", description: "Primary care, diagnostics, community health" },
  { Icon: Palette, name: "Creative Industries", description: "Content, media, cultural economy" },
];

export function Sectors() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            Focus Sectors
          </p>
          <h2 className="text-4xl font-bold text-charcoal mb-4">
            Where Abeokuta has an edge.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            We invest where local advantage is real — sectors shaped by Ogun
            State&apos;s universities, industry, land, and people.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sectors.map(({ Icon, name, description }) => (
            <div
              key={name}
              className="group bg-white p-6 rounded-sm border border-cream-dark hover:border-gold/40 hover:shadow-md transition-all duration-300 cursor-default text-center"
            >
              <div className="w-12 h-12 bg-forest/5 group-hover:bg-forest rounded-sm flex items-center justify-center mx-auto mb-4 transition-colors">
                <Icon
                  size={20}
                  className="text-forest group-hover:text-gold transition-colors"
                />
              </div>
              <p className="font-semibold text-charcoal text-sm mb-1">{name}</p>
              <p className="text-muted text-xs leading-relaxed hidden group-hover:block">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
