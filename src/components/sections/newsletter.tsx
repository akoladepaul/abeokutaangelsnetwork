"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setSubmitted(true);
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-dark rounded-sm px-8 py-14 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            Stay Informed
          </p>
          <h2 className="text-3xl font-bold text-cream mb-3">
            Get the Abeokuta ecosystem digest.
          </h2>
          <p className="text-cream/60 text-sm mb-8 max-w-md mx-auto">
            Monthly deal flow insights, ecosystem news, and event updates.
            No spam. Unsubscribe any time.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-sm px-6 py-3 text-gold text-sm font-medium">
              You&apos;re on the list. Welcome to the network.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-sm bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold"
              />
              <Button type="submit" variant="primary" size="md" className="gap-2">
                Subscribe <Send size={14} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
