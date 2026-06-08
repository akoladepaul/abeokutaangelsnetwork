"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-5xl font-bold mb-4">Get in touch.</h1>
          <p className="text-cream/70 text-xl max-w-xl">Questions, partnerships, media inquiries — we read every message.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Send a message</h2>
              {sent ? (
                <div className="flex items-center gap-3 bg-cream p-6 rounded-sm border border-cream-dark">
                  <CheckCircle size={20} className="text-forest" />
                  <p className="text-charcoal text-sm">Message sent. We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">Name</label>
                      <input required className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">Email</label>
                      <input type="email" required className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">Subject</label>
                    <input required className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">Message</label>
                    <textarea rows={5} required className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 resize-none" />
                  </div>
                  <Button type="submit" variant="primary" size="lg">Send Message</Button>
                </form>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-charcoal">Contact details</h2>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-forest mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal text-sm">Email</p>
                  <a href="mailto:hello@abeokutaangels.ng" className="text-muted text-sm hover:text-forest">hello@abeokutaangels.ng</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-forest mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal text-sm">Location</p>
                  <p className="text-muted text-sm">Abeokuta, Ogun State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
