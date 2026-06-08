"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-5xl font-bold mb-4">Get in touch.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            Questions, partnerships, media inquiries — we read every message.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Send a message</h2>

              {status === "sent" ? (
                <div className="flex items-start gap-3 bg-cream p-6 rounded-sm border border-cream-dark">
                  <CheckCircle size={20} className="text-forest mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-charcoal text-sm">Message sent.</p>
                    <p className="text-muted text-sm mt-1">We&apos;ll be in touch soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
                        Name <span className="text-gold">*</span>
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={set("name")}
                        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
                      Subject <span className="text-gold">*</span>
                    </label>
                    <input
                      required
                      value={form.subject}
                      onChange={set("subject")}
                      className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
                      Message <span className="text-gold">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={set("message")}
                      className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</p>
                  )}
                  <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="gap-2">
                    {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-6 pt-2">
              <h2 className="text-2xl font-bold text-charcoal">Contact details</h2>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-forest mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal text-sm">Email</p>
                  <a href="mailto:hello@abeokutaangels.ng" className="text-muted text-sm hover:text-forest">
                    hello@abeokutaangels.ng
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-forest mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal text-sm">Location</p>
                  <p className="text-muted text-sm">Abeokuta, Ogun State, Nigeria</p>
                </div>
              </div>
              <div className="mt-4 p-6 bg-cream rounded-sm border border-cream-dark">
                <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Quick links</p>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><a href="/apply/investor" className="text-forest hover:underline">Apply as an investor →</a></li>
                  <li><a href="/apply/startup" className="text-forest hover:underline">Submit a startup pitch →</a></li>
                  <li><a href="/events" className="text-forest hover:underline">View upcoming events →</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
