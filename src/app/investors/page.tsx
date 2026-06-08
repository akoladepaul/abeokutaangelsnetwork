import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Access curated deal flow from Abeokuta and Ogun State",
  "Co-invest alongside experienced angels and operators",
  "Smart matching to startups aligned with your thesis",
  "Quarterly portfolio updates and ecosystem reports",
  "Access ABAN and EBAN pan-African investor network",
  "Attend exclusive pitch days and founder dinners",
  "Minimum ticket size: ₦5M",
];

const steps = [
  { n: "01", title: "Apply", desc: "Complete our investor membership application with your background, investment thesis, and sector preferences." },
  { n: "02", title: "Screening Call", desc: "A 30-minute call with the AAN team to align on fit, expectations, and membership terms." },
  { n: "03", title: "Induction", desc: "Sign the membership agreement, complete KYC, and get access to the member portal and deal flow." },
  { n: "04", title: "Invest", desc: "Browse curated startups, express interest, conduct diligence, and deploy capital alongside fellow angels." },
];

export default function InvestorsPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">For Investors</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Deploy capital with conviction.
          </h1>
          <p className="text-cream/70 text-xl max-w-2xl leading-relaxed">
            Join a community of angels writing disciplined cheques into
            Abeokuta&apos;s most promising builders. Deal flow you won&apos;t find on Twitter.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Member Benefits</p>
              <h2 className="text-3xl font-bold text-charcoal mb-8">What you get as a member.</h2>
              <ul className="flex flex-col gap-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <CheckCircle size={16} className="text-forest mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream rounded-sm p-8">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Who We Look For</p>
              <ul className="flex flex-col gap-4 text-sm text-charcoal/80">
                {[
                  "High-net-worth individuals and accredited investors",
                  "Professionals, entrepreneurs, and operators",
                  "Diaspora with an interest in the Abeokuta ecosystem",
                  "Institutions and family offices interested in early-stage Africa",
                  "Commitment to at least one investment per year",
                  "Willingness to add value beyond capital (mentorship, network)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 pb-3 border-b border-cream-dark last:border-0 last:pb-0">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Membership Process</p>
          <h2 className="text-3xl font-bold text-charcoal mb-12">How to join.</h2>
          <div className="flex flex-col gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-6 bg-white p-6 rounded-sm border border-cream-dark">
                <span className="text-3xl font-bold text-cream-dark/60 flex-shrink-0">{n}</span>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-dark text-cream text-center px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to invest in Abeokuta&apos;s future?</h2>
          <p className="text-cream/60 mb-8">Applications are reviewed on a rolling basis. Limited founding member slots available.</p>
          <Link href="/apply/investor">
            <Button variant="primary" size="lg" className="group">
              Apply to Join <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
