"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const sectors = ["AgriTech", "EdTech", "FinTech", "Logistics", "HealthTech", "Creative Industries", "Other"];
const stages = ["Idea / Pre-product", "MVP / Beta", "Revenue-generating", "Scaling"];

export default function StartupApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-gold" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">Pitch received.</h1>
          <p className="text-muted leading-relaxed">
            Thank you for submitting to Abeokuta Angels Network. We review every
            application and will respond within 2 weeks with our decision or next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Startup Application</p>
          <h1 className="text-4xl font-bold text-charcoal mb-3">Submit Your Pitch</h1>
          <p className="text-muted leading-relaxed">
            Tell us about your startup. Be honest — we value clarity over polish.
            No fairy-tale TAMs. We respond to every application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-cream-dark p-8 flex flex-col gap-6">

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Company Details
            </h2>
            <div className="flex flex-col gap-4">
              <Field label="Company Name" name="company" required />
              <Field label="Website" name="website" type="url" placeholder="https://..." />
              <Textarea
                label="One-Line Description"
                name="oneliner"
                rows={2}
                required
                placeholder="Describe what you do in one sentence."
              />
              <Textarea
                label="Problem You're Solving"
                name="problem"
                rows={3}
                required
                placeholder="What painful, specific problem are you solving? For whom?"
              />
              <Textarea
                label="Your Solution"
                name="solution"
                rows={3}
                required
                placeholder="How do you solve it? What makes your approach different?"
              />
            </div>
          </div>

          {/* Classification */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Classification
            </h2>
            <div className="flex flex-col gap-5">
              {/* Sector */}
              <div>
                <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">
                  Sector <span className="text-gold">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSector(s)}
                      className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                        sector === s
                          ? "bg-forest text-cream border-forest"
                          : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage */}
              <div>
                <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">
                  Current Stage <span className="text-gold">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {stages.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStage(s)}
                      className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                        stage === s
                          ? "bg-forest text-cream border-forest"
                          : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Year Founded" name="founded" placeholder="e.g. 2023" />
                <Field label="Team Size" name="teamSize" placeholder="e.g. 3" />
                <Field label="Location (City)" name="location" placeholder="e.g. Abeokuta" required />
                <SelectField
                  label="Funding Ask"
                  name="fundingAsk"
                  options={["₦5M – ₦10M", "₦10M – ₦25M", "₦25M – ₦50M", "₦50M+"]}
                />
              </div>
            </div>
          </div>

          {/* Traction */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Traction & Market
            </h2>
            <div className="flex flex-col gap-4">
              <Textarea
                label="Current Traction"
                name="traction"
                rows={3}
                placeholder="Users, revenue, pilots, partnerships — real numbers only. If pre-revenue, say so."
              />
              <Textarea
                label="Market Size (Be Realistic)"
                name="marketSize"
                rows={2}
                placeholder="How big is the addressable market in Ogun State / Nigeria? How did you arrive at that?"
              />
              <Textarea
                label="Use of Funds"
                name="useOfFunds"
                rows={3}
                required
                placeholder="How will you deploy the capital? Be specific."
              />
            </div>
          </div>

          {/* Founders */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Founding Team
            </h2>
            <div className="flex flex-col gap-4">
              <Field label="Lead Founder Name" name="founderName" required />
              <Field label="Email" name="founderEmail" type="email" required />
              <Field label="Phone" name="founderPhone" type="tel" />
              <Field label="LinkedIn (Lead Founder)" name="founderLinkedin" />
              <Textarea
                label="Team Background"
                name="teamBackground"
                rows={3}
                required
                placeholder="Who are the founders? What makes you uniquely positioned to solve this problem?"
              />
            </div>
          </div>

          {/* Deck */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Pitch Deck
            </h2>
            <div className="flex flex-col gap-4">
              <Field label="Pitch Deck Link (Google Drive / Dropbox)" name="deckLink" type="url" placeholder="https://..." />
              <p className="text-xs text-muted">
                Ensure the link is publicly accessible or set to &ldquo;anyone with link can view.&rdquo;
                Max 20 slides. No confidential NDA required at this stage.
              </p>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full justify-center">
            Submit Pitch
          </Button>
          <p className="text-xs text-muted text-center">
            We review every application and respond within 2 weeks. No black holes.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", required = false, placeholder, className = "",
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={name} name={name} type={type} required={required} placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 transition-colors"
      />
    </div>
  );
}

function Textarea({
  label, name, rows = 4, required = false, placeholder,
}: {
  label: string; name: string; rows?: number; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <textarea
        id={name} name={name} rows={rows} required={required} placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 transition-colors resize-none"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">{label}</label>
      <select id={name} name={name} className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 transition-colors">
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
