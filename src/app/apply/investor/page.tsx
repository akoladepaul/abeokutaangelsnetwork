"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

const sectors = ["AgriTech", "EdTech", "FinTech", "Logistics", "HealthTech", "Creative Industries", "Other"];
const stages = ["Pre-seed", "Seed", "Both"];

export default function InvestorApplyPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function toggleSector(s: string) {
    setSelectedSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/apply/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sectors: selectedSectors.join(", "), stage }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-gold" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">Application received.</h1>
          <p className="text-muted leading-relaxed">
            Thank you for your interest in joining Abeokuta Angels Network. We&apos;ll
            review your application and reach out within 5–7 business days to
            schedule a screening call.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Investor Application</p>
          <h1 className="text-4xl font-bold text-charcoal mb-3">Join as an Angel Investor</h1>
          <p className="text-muted leading-relaxed">
            Tell us about yourself and your investment interests. All applications are
            reviewed personally by the AAN founding team.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-sm border border-cream-dark p-8 flex flex-col gap-6">
          {/* Personal */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" name="firstName" required />
              <Field label="Last Name" name="lastName" required />
              <Field label="Email Address" name="email" type="email" required />
              <Field label="Phone Number" name="phone" type="tel" />
              <Field label="LinkedIn Profile" name="linkedin" placeholder="linkedin.com/in/..." className="sm:col-span-2" />
            </div>
          </div>

          {/* Background */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Background
            </h2>
            <div className="flex flex-col gap-4">
              <Field label="Current Role / Profession" name="role" required />
              <Field label="Company / Organisation" name="company" />
              <Textarea
                label="Brief Bio (2–3 sentences)"
                name="bio"
                rows={3}
                placeholder="Tell us about your professional background..."
              />
            </div>
          </div>

          {/* Investment Preferences */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Investment Preferences
            </h2>

            <div className="flex flex-col gap-5">
              {/* Sectors */}
              <div>
                <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">
                  Sectors of Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSector(s)}
                      className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                        selectedSectors.includes(s)
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
                  Preferred Stage
                </label>
                <div className="flex gap-3">
                  {stages.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStage(s)}
                      className={`text-sm px-4 py-2 rounded-sm border transition-colors ${
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
                <SelectField
                  label="Ticket Size Range"
                  name="ticketSize"
                  options={["₦5M – ₦10M", "₦10M – ₦25M", "₦25M – ₦50M", "₦50M+"]}
                />
                <SelectField
                  label="Investments Per Year (Target)"
                  name="investmentsPerYear"
                  options={["1–2", "3–5", "5+"]}
                />
              </div>

              <Textarea
                label="Investment Thesis (Optional)"
                name="thesis"
                rows={3}
                placeholder="What types of founders or problems are you most excited to back?"
              />
            </div>
          </div>

          {/* Prior Experience */}
          <div>
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
              Angel Experience
            </h2>
            <div className="flex flex-col gap-4">
              <SelectField
                label="Prior Angel / VC Experience"
                name="experience"
                options={["None — first time angel", "1–2 investments", "3–10 investments", "10+ investments"]}
              />
              <Textarea
                label="Why Abeokuta Angels Network?"
                name="whyAAN"
                rows={3}
                required
                placeholder="What draws you to investing in Abeokuta and secondary-city startups?"
              />
            </div>
          </div>

          {status === "error" && (
            <p className="text-red-600 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
          )}
          <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="mt-2 w-full justify-center gap-2">
            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
            Submit Application
          </Button>
          <p className="text-xs text-muted text-center">
            By submitting you agree to our Privacy Policy and Terms of Use.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 transition-colors"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  rows = 4,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 transition-colors resize-none"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 transition-colors"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
