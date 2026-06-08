import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  { n: "01", title: "Submit Application", desc: "Fill out the investor membership form with your background, investment thesis, sector interests, and ticket size range. Takes about 10 minutes." },
  { n: "02", title: "Application Review", desc: "The AAN team reviews your application within 5–7 business days. We assess alignment with our founding thesis and community values." },
  { n: "03", title: "Screening Call", desc: "A 30-minute video call with the AAN team to discuss your investment philosophy, expectations, and what you can offer beyond capital." },
  { n: "04", title: "Membership Agreement", desc: "Complete KYC documentation, sign the membership agreement, and pay the annual membership fee. Membership is typically valid for 12 months." },
  { n: "05", title: "Platform Access", desc: "Gain access to the AAN member portal: curated deal flow feed, event calendar, co-investment board, and document library." },
  { n: "06", title: "First Deal", desc: "Browse matched startups, express interest, conduct your own diligence with AAN support, and deploy your first cheque when ready." },
];

export default function InvestorHowItWorksPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">How It Works</p>
          <h1 className="text-5xl font-bold mb-4">From application to first cheque.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            A simple, respectful process for joining AAN as an angel investor.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-6 p-6 bg-cream rounded-sm border border-cream-dark">
                <div className="w-12 h-12 bg-forest rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-sm font-bold">{n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/apply/investor">
              <Button variant="primary" size="lg">Start Your Application</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
