import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  { n: "01", title: "Submit Pitch Profile", desc: "Complete our startup application form: company overview, problem statement, solution, traction, team background, funding ask, and pitch deck link. No PDF uploads needed — just a shareable link." },
  { n: "02", title: "Initial Screen (2 weeks)", desc: "Our deal team reviews every application against the AAN thesis: problem relevance, founder quality, local market fit, and scalability. You will hear back from us within 2 weeks — always." },
  { n: "03", title: "Founder Interview", desc: "Promising applications get a 45-minute founder call with the AAN deal team. We dig into your assumptions, your traction, and the honest state of your business." },
  { n: "04", title: "Investor Matching", desc: "Approved startups are matched to AAN angel members based on sector, stage, and ticket size compatibility. You appear in matched investors' deal flow feeds." },
  { n: "05", title: "Pitch Day or 1-on-1s", desc: "Present at our quarterly pitch days or conduct private sessions with matched investors. Format depends on stage, sector, and investor preference." },
  { n: "06", title: "Due Diligence", desc: "Interested investors conduct their own due diligence. AAN provides standard DD checklist templates, legal document templates, and guidance throughout." },
  { n: "07", title: "Term Sheet & Close", desc: "Investors who proceed issue a term sheet. AAN provides standard templates for SAFEs, convertible notes, and equity rounds. You close on your own timeline." },
];

export default function StartupHowItWorksPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Pitch Process</p>
          <h1 className="text-5xl font-bold mb-4">From pitch to term sheet.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            A transparent, respectful process for founders pitching to AAN.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-5 p-6 bg-cream rounded-sm border border-cream-dark">
                <div className="w-11 h-11 bg-forest rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-xs font-bold">{n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted text-sm mb-6">We respond to every application. No black holes.</p>
            <Link href="/apply/startup">
              <Button variant="primary" size="lg">Submit Your Pitch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
