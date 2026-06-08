import { ClipboardList, Search, Handshake, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: ClipboardList,
    title: "Apply",
    description:
      "Investors submit a membership application. Startups submit a pitch profile with company details, deck, and funding ask.",
  },
  {
    number: "02",
    Icon: Search,
    title: "Screen",
    description:
      "AAN reviews each application against our investment thesis. Startups are scored on problem relevance, team quality, and local market fit.",
  },
  {
    number: "03",
    Icon: Handshake,
    title: "Match",
    description:
      "Approved startups are matched to investors based on sector, stage, and ticket size. Investors receive a curated deal flow feed.",
  },
  {
    number: "04",
    Icon: TrendingUp,
    title: "Invest & Grow",
    description:
      "Matched parties connect, conduct due diligence, and deploy capital. AAN stays close post-investment with mentorship and follow-on support.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl font-bold text-charcoal mb-4">
            From pitch to portfolio.
          </h2>
          <p className="text-muted text-lg">
            A simple, disciplined process that respects both founders&apos; time
            and investors&apos; capital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ number, Icon, title, description }, i) => (
            <div key={title} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gold/20 z-0" />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-forest rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <span className="text-3xl font-bold text-cream-dark/80">
                    {number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
