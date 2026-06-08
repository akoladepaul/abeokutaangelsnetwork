import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

const criteria = [
  { label: "Problem Clarity", desc: "You can explain the problem in one sentence without jargon. It&apos;s real, local, and painful." },
  { label: "Founder Quality", desc: "Deep domain knowledge, local market understanding, and the resilience to build in a secondary city." },
  { label: "Traction", desc: "Real signals — users, revenue, pilots, partnerships. Vanity metrics don&apos;t move us." },
  { label: "Scalability", desc: "Realistic TAM. A business that works in Abeokuta and can grow to Ogun State and beyond." },
  { label: "Local Advantage", desc: "You have an edge because you&apos;re here — community, regulatory knowledge, distribution." },
];

const sectors = ["AgriTech", "EdTech", "FinTech", "Logistics", "HealthTech", "Creative Industries"];

const steps = [
  { n: "01", title: "Submit Pitch", desc: "Fill out our startup profile form with your company details, deck, funding ask, and key metrics." },
  { n: "02", title: "Initial Screen", desc: "AAN analysts review against our thesis within 2 weeks. We respond to every application." },
  { n: "03", title: "Investor Matching", desc: "Approved startups are matched to angels based on sector, stage, and ticket fit." },
  { n: "04", title: "Pitch Day / 1-on-1s", desc: "Present to matched investors at our quarterly pitch days or in private sessions." },
  { n: "05", title: "Due Diligence & Term Sheet", desc: "Interested investors conduct diligence. AAN supports with templates and guidance." },
];

export default function StartupsPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">For Startups</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">Find your believers.</h1>
          <p className="text-cream/70 text-xl max-w-2xl leading-relaxed">
            We back founders with local insight and scalable ambition. Submit your
            pitch and get matched with angels who understand your market.
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {sectors.map((s) => (
              <span key={s} className="bg-white/10 text-cream/80 text-xs px-3 py-1 rounded-full border border-white/20">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What we fund */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Selection Criteria</p>
          <h2 className="text-3xl font-bold text-charcoal mb-4">What we look for.</h2>
          <p className="text-muted mb-10 leading-relaxed">
            We are not chasing hype. We are uncovering overlooked builders solving real
            problems with limited resources and strong local insight.
          </p>
          <div className="flex flex-col gap-5">
            {criteria.map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-4 p-6 bg-cream rounded-sm border border-cream-dark">
                <CheckCircle size={18} className="text-forest mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-charcoal mb-1">{label}</p>
                  <p className="text-muted text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Beyond the Cheque</p>
              <h2 className="text-3xl font-bold text-charcoal mb-6">What founders get.</h2>
              <ul className="flex flex-col gap-4">
                {[
                  "Pre-seed to early-stage funding (₦5M – ₦50M)",
                  "Smart matching with thesis-aligned investors",
                  "Mentorship from operators and angels",
                  "Access to grants, accelerators, and open rounds",
                  "Post-investment support and follow-on capital",
                  "Introductions to ABAN and EBAN networks",
                  "Peer founder community in Abeokuta",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <CheckCircle size={16} className="text-forest mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">The Pitch Process</p>
              <h2 className="text-3xl font-bold text-charcoal mb-6">How it works.</h2>
              <div className="flex flex-col gap-4">
                {steps.map(({ n, title, desc }) => (
                  <div key={n} className="flex items-start gap-4 bg-white p-5 rounded-sm border border-cream-dark">
                    <span className="text-xl font-bold text-cream-dark/50 flex-shrink-0">{n}</span>
                    <div>
                      <p className="font-semibold text-charcoal text-sm mb-0.5">{title}</p>
                      <p className="text-muted text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest text-cream text-center px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to pitch?</h2>
          <p className="text-cream/60 mb-8">We review every application. No black holes. Abeokuta is ready for your idea.</p>
          <Link href="/apply/startup">
            <Button variant="primary" size="lg" className="group">
              Submit Your Pitch <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
