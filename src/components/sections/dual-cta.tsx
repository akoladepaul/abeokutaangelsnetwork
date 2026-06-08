import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const investorBenefits = [
  "Curated deal flow from Abeokuta & Ogun State",
  "Co-invest alongside experienced angels",
  "Access to ABAN & EBAN pan-African network",
  "Quarterly portfolio updates & events",
  "Minimum ₦5M ticket size",
];

const startupBenefits = [
  "Pre-seed to early-stage funding (₦5M–₦50M)",
  "Smart matching with aligned investors",
  "Mentorship from operators & angels",
  "Access to grant & accelerator opportunities",
  "Post-investment support & follow-on",
];

export function DualCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            Join the Network
          </p>
          <h2 className="text-4xl font-bold text-charcoal">
            Who are you?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Investor card */}
          <div className="bg-forest-dark text-cream rounded-sm p-10 flex flex-col">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
              For Investors
            </p>
            <h3 className="text-3xl font-bold mb-4">
              Deploy capital with conviction.
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed mb-8">
              Join a community of angels writing disciplined cheques into
              Abeokuta&apos;s most promising builders.
            </p>
            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {investorBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-cream/80">
                  <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/apply/investor">
              <Button variant="primary" size="lg" className="group w-full justify-center">
                Apply to Join
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Startup card */}
          <div className="bg-cream border-2 border-cream-dark rounded-sm p-10 flex flex-col">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
              For Startups
            </p>
            <h3 className="text-3xl font-bold text-charcoal mb-4">
              Find your believers.
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-8">
              We back founders with local insight and scalable ambition.
              Submit your pitch and get matched with aligned investors.
            </p>
            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {startupBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                  <CheckCircle size={16} className="text-forest mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/apply/startup">
              <Button variant="secondary" size="lg" className="group w-full justify-center">
                Submit Your Pitch
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
