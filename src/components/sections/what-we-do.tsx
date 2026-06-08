import { Banknote, Users, Rocket } from "lucide-react";

const pillars = [
  {
    Icon: Banknote,
    title: "Invest",
    description:
      "We deploy patient pre-seed and early-stage capital into startups and innovative businesses rooted in Abeokuta and Ogun State — sectors with natural local advantage.",
  },
  {
    Icon: Users,
    title: "Connect",
    description:
      "We build high-trust relationships between founders, angels, mentors, and ecosystem partners. Proximity matters more than prestige in emerging ecosystems.",
  },
  {
    Icon: Rocket,
    title: "Grow",
    description:
      "Beyond the cheque — we provide mentorship, co-investment opportunities, and access to a pan-African network through ABAN and EBAN affiliations.",
  },
];

export function WhatWeDo() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-2xl mb-16">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="text-4xl font-bold text-charcoal mb-4">
            Capital with conviction.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Abeokuta Angels Network is more than a funding platform — it&apos;s
            a community of believers investing in the city&apos;s future.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="group p-8 border border-cream-dark rounded-sm hover:border-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-forest/5 group-hover:bg-gold/10 rounded-sm flex items-center justify-center mb-6 transition-colors">
                <Icon size={22} className="text-forest group-hover:text-gold transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
