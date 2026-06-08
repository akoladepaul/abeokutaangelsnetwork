"use client";
import { useState } from "react";
import { investorFaqs } from "@/data/content";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InvestorFaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Investor FAQ</p>
          <h1 className="text-5xl font-bold mb-4">Questions from investors.</h1>
          <p className="text-cream/70 text-xl max-w-xl">Everything you need to know before applying.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col divide-y divide-cream-dark">
            {investorFaqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-charcoal">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={cn("text-muted flex-shrink-0 transition-transform", open === i && "rotate-180")}
                  />
                </button>
                {open === i && (
                  <p className="text-muted text-sm leading-relaxed pb-5">{faq.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted text-sm mb-6">Still have questions? We&apos;d love to talk.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link>
              <Link href="/apply/investor"><Button variant="primary" size="lg">Apply to Join</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
