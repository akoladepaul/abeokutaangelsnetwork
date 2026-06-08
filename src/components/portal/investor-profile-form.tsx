"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";
import type { InvestorProfile } from "@/types/database";

const SECTORS = ["AgriTech", "EdTech", "FinTech", "Logistics", "HealthTech", "Creative Industries", "Other"];
const STAGES = ["Pre-seed", "Seed", "Series A"];
const TICKET_OPTIONS = [
  { label: "₦5M – ₦10M", min: 5_000_000, max: 10_000_000 },
  { label: "₦10M – ₦25M", min: 10_000_000, max: 25_000_000 },
  { label: "₦25M – ₦50M", min: 25_000_000, max: 50_000_000 },
  { label: "₦50M+", min: 50_000_000, max: 200_000_000 },
];

interface Props {
  userId: string;
  initial: InvestorProfile | null;
}

export function InvestorProfileForm({ userId, initial }: Props) {
  const [form, setForm] = useState({
    full_name: initial?.full_name ?? "",
    headline: initial?.headline ?? "",
    bio: initial?.bio ?? "",
    linkedin_url: initial?.linkedin_url ?? "",
    thesis: initial?.thesis ?? "",
    investments_pa: initial?.investments_pa ?? "",
  });
  const [sectors, setSectors] = useState<string[]>(initial?.sectors ?? []);
  const [stages, setStages] = useState<string[]>(initial?.stages ?? []);
  const [ticketIdx, setTicketIdx] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function toggleSector(s: string) {
    setSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }
  function toggleStage(s: string) {
    setStages((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }
  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const supabase = createClient();
    const ticket = TICKET_OPTIONS[ticketIdx];
    const payload = {
      user_id: userId,
      ...form,
      sectors,
      stages,
      ticket_min: ticket.min,
      ticket_max: ticket.max,
      updated_at: new Date().toISOString(),
    };

    const { error } = initial
      ? await supabase.from("investor_profiles").update(payload).eq("user_id", userId)
      : await supabase.from("investor_profiles").insert(payload);

    setStatus(error ? "error" : "saved");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {/* Personal */}
      <section className="bg-white border border-cream-dark rounded-sm p-6">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
          Personal Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.full_name} onChange={set("full_name")} required />
          <Field label="Headline / Title" value={form.headline} onChange={set("headline")} placeholder="e.g. Angel Investor & Founder" />
          <Field label="LinkedIn URL" value={form.linkedin_url} onChange={set("linkedin_url")} placeholder="linkedin.com/in/..." className="sm:col-span-2" />
          <TextArea label="Bio (2–3 sentences)" value={form.bio} onChange={set("bio")} rows={3} className="sm:col-span-2" />
        </div>
      </section>

      {/* Investment Preferences */}
      <section className="bg-white border border-cream-dark rounded-sm p-6">
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
              {SECTORS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSector(s)}
                  className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${sectors.includes(s) ? "bg-forest text-cream border-forest" : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Stages */}
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">
              Preferred Stages
            </label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <button key={s} type="button" onClick={() => toggleStage(s)}
                  className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${stages.includes(s) ? "bg-forest text-cream border-forest" : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket size */}
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">
              Ticket Size
            </label>
            <div className="flex flex-wrap gap-2">
              {TICKET_OPTIONS.map((t, i) => (
                <button key={t.label} type="button" onClick={() => setTicketIdx(i)}
                  className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${ticketIdx === i ? "bg-forest text-cream border-forest" : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <Field label="Investments Per Year" value={form.investments_pa} onChange={set("investments_pa")} placeholder="e.g. 2–3" />
          <TextArea label="Investment Thesis" value={form.thesis} onChange={set("thesis")} rows={4} placeholder="What types of founders and problems excite you most?" />
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={status === "saving"} className="gap-2">
          {status === "saving" && <Loader2 size={16} className="animate-spin" />}
          {status === "saving" ? "Saving…" : "Save Profile"}
        </Button>
        {status === "saved" && (
          <span className="flex items-center gap-2 text-green-700 text-sm">
            <CheckCircle size={16} /> Profile saved
          </span>
        )}
        {status === "error" && (
          <span className="text-red-600 text-sm">Save failed. Please try again.</span>
        )}
      </div>
    </form>
  );
}

function Field({ label, value, onChange, required, placeholder, className = "" }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input required={required} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder, className = "" }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">{label}</label>
      <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60 resize-none" />
    </div>
  );
}
