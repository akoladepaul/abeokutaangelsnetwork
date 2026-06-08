import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Target, TrendingUp, Users } from "lucide-react";

const sectors = [
  { name: "AgriTech", rationale: "Ogun State has 25,000+ smallholder farmers and direct access to Lagos's food markets. Farm-to-market tech and precision agriculture are underserved." },
  { name: "EdTech", rationale: "Three universities within 60km. FUNAAB, MAPOLY, and Federal Polytechnic Ilaro produce thousands of graduates annually who lack industry-relevant skills." },
  { name: "FinTech", rationale: "67% of Ogun State adults are underbanked. Mobile payments, savings, and microfinance tools built for secondary-city realities are needed." },
  { name: "Logistics", rationale: "Proximity to Lagos, the Apapa port corridor, and major road infrastructure makes Ogun State a natural logistics hub. Last-mile solutions are nascent." },
  { name: "HealthTech", rationale: "Primary healthcare access outside Abeokuta city is poor. Telemedicine, diagnostics, and community health tools have a clear local market." },
  { name: "Creative Industries", rationale: "Abeokuta's rich cultural heritage — Olumo Rock, adire, and a proud artistic tradition — anchors a growing creative economy that needs digital infrastructure." },
];

export default function ThesisPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Investment Thesis</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Local capital for local builders.
          </h1>
          <p className="text-cream/70 text-xl max-w-2xl leading-relaxed">
            We invest where we have an edge: deep local knowledge, genuine proximity
            to founders, and conviction in the structural advantages of the Abeokuta
            and Ogun State ecosystem.
          </p>
        </div>
      </section>

      {/* Core thesis */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Core Thesis</p>
          <h2 className="text-3xl font-bold text-charcoal mb-8">The investment case for Abeokuta.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { Icon: MapPin, title: "Geography-first", desc: "Abeokuta is 90 minutes from Lagos — close enough to benefit from the Lagos tech corridor, far enough to have lower costs, deeper community ties, and underserved local markets." },
              { Icon: Target, title: "Pre-seed to early-stage", desc: "We write the first or second institutional cheque. We don't wait for product-market fit. We back founder-market fit and honest problem articulation." },
              { Icon: TrendingUp, title: "Realistic returns", desc: "Our thesis is not chasing unicorns. It's backing 10–15 companies per year, expecting 2–3 to generate meaningful returns. Disciplined portfolio construction, not lottery tickets." },
              { Icon: Users, title: "Community-led deal flow", desc: "Our best deals come from the community — university hubs, founder networks, operator referrals. Not pitch competitions. Not Twitter. Proximity." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 bg-cream rounded-sm border border-cream-dark">
                <div className="w-10 h-10 bg-forest/5 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-forest" />
                </div>
                <div>
                  <p className="font-bold text-charcoal mb-1">{title}</p>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Parameters */}
          <div className="bg-forest-dark text-cream rounded-sm p-8">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-6">Investment Parameters</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                ["Stage", "Pre-seed → Early-stage"],
                ["Ticket Size", "₦5M – ₦50M"],
                ["Geography", "Abeokuta → Ogun State → Secondary cities"],
                ["Equity", "5 – 15% (or convertible note / SAFE)"],
                ["Investments / yr", "Target 4–6 deals per year"],
                ["Network", "ABAN + EBAN affiliated"],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-cream/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-cream font-medium text-sm">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Sector Rationale</p>
          <h2 className="text-3xl font-bold text-charcoal mb-4">Where we invest and why.</h2>
          <p className="text-muted mb-10 leading-relaxed">
            We choose sectors with a demonstrable local advantage — not because
            they&apos;re fashionable, but because Abeokuta has structural edges that
            make local startups harder to replicate from the outside.
          </p>
          <div className="flex flex-col gap-5">
            {sectors.map(({ name, rationale }) => (
              <div key={name} className="flex items-start gap-4 bg-white p-6 rounded-sm border border-cream-dark">
                <Badge variant="sector" className="flex-shrink-0 mt-0.5">{name}</Badge>
                <p className="text-muted text-sm leading-relaxed">{rationale}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest text-cream text-center px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Aligned with our thesis?</h2>
          <p className="text-cream/60 mb-8">Join as an investor or submit your startup for consideration.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply/investor">
              <Button variant="primary" size="lg">Join as Investor</Button>
            </Link>
            <Link href="/apply/startup">
              <Button variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream hover:text-forest-dark">
                Submit a Pitch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
