import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Eye, Heart } from "lucide-react";

const values = [
  { Icon: Target, title: "Disciplined Capital", desc: "We invest with conviction, not FOMO. Every cheque is backed by real analysis and local insight." },
  { Icon: Eye, title: "Long-Term Vision", desc: "We stay close to founders long after the pitch deck is forgotten. Patient capital, patient relationships." },
  { Icon: Heart, title: "Community First", desc: "Trust compounds faster than capital in emerging ecosystems. We build the community first, the returns follow." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            We believe Abeokuta&apos;s best builders deserve organized capital.
          </h1>
          <p className="text-cream/70 text-xl leading-relaxed max-w-2xl">
            Abeokuta Angels Network was founded by a group of professionals, operators,
            and returning diaspora who saw a gap — brilliant founders building in Ogun
            State with no local capital infrastructure to back them.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-charcoal mb-6">Cities rise when capital learns to stay home.</h2>
              <p className="text-muted leading-relaxed mb-4">
                For too long, promising founders from Abeokuta have had to travel to Lagos,
                Abuja, or abroad to access early-stage capital. Local talent was being exported
                while local problems went unsolved.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Abeokuta Angels Network was built to change that. We are a community of
                angels, operators, and ecosystem builders who believe that Ogun State&apos;s
                universities, industry base, agricultural land, and proximity to Lagos create
                a uniquely investable environment.
              </p>
              <p className="text-muted leading-relaxed">
                We deploy patient pre-seed and early-stage capital with a deliberate
                local-first thesis — Abeokuta first, Ogun State next, selected secondary
                cities thereafter.
              </p>
            </div>
            <div className="bg-cream rounded-sm p-8">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Investment Thesis</p>
              <ul className="flex flex-col gap-4 text-sm text-charcoal/80">
                {[
                  ["Geography", "Abeokuta → Ogun State → Secondary cities"],
                  ["Stage", "Pre-seed to early-stage"],
                  ["Ticket Size", "₦5M – ₦50M"],
                  ["Sectors", "AgriTech, EdTech, FinTech, Logistics, Health, Creative"],
                  ["Founders", "Local-first, university-linked, diaspora returnees"],
                  ["Affiliations", "ABAN, EBAN pan-African networks"],
                ].map(([label, value]) => (
                  <li key={label} className="flex flex-col gap-0.5 pb-4 border-b border-cream-dark last:border-0 last:pb-0">
                    <span className="text-xs text-muted uppercase tracking-wider">{label}</span>
                    <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Our Values</p>
          <h2 className="text-3xl font-bold text-charcoal mb-12">What we stand for.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-sm border border-cream-dark">
                <div className="w-11 h-11 bg-forest/5 rounded-sm flex items-center justify-center mb-5">
                  <Icon size={20} className="text-forest" />
                </div>
                <h3 className="font-bold text-charcoal mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-charcoal mb-4">
            Capital is a vote of confidence.
          </h2>
          <p className="text-muted mb-8">
            Abeokuta is ready for one. Join us as an investor or bring us your startup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply/investor">
              <Button variant="primary" size="lg">Join as Investor</Button>
            </Link>
            <Link href="/apply/startup">
              <Button variant="outline" size="lg">Submit a Pitch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
