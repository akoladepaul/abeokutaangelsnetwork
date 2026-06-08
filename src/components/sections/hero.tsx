import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-forest-dark flex items-center overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest-dark/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
            <TrendingUp size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">
              Abeokuta&apos;s First Angel Network
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] mb-6">
            Organized belief,
            <br />
            <span className="text-gold">with a cheque book.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-cream/70 text-xl leading-relaxed mb-10 max-w-xl">
            We back overlooked builders solving real problems in Abeokuta, Ogun
            State, and beyond. Pre-seed to early-stage. Patient capital.
            Community-first.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/apply/investor">
              <Button size="lg" variant="primary" className="group">
                Join as Investor
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href="/apply/startup">
              <Button
                size="lg"
                variant="outline"
                className="border-cream/30 text-cream hover:bg-cream hover:text-forest-dark"
              >
                Pitch Your Startup
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-cream/20 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gold animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
