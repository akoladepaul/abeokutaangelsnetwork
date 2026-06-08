"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";
import type { StartupProfile } from "@/types/database";

const SECTORS = ["AgriTech", "EdTech", "FinTech", "Logistics", "HealthTech", "Creative Industries", "Other"];
const STAGES = ["Pre-seed", "Seed", "Series A"];
const FUNDING_OPTIONS = [
  { label: "₦5M – ₦15M", value: 10_000_000 },
  { label: "₦15M – ₦30M", value: 22_500_000 },
  { label: "₦30M – ₦75M", value: 50_000_000 },
  { label: "₦75M+", value: 100_000_000 },
];

interface Props {
  userId: string;
  initial: StartupProfile | null;
}

export function StartupProfileForm({ userId, initial }: Props) {
  const [form, setForm] = useState({
    company_name: initial?.company_name ?? "",
    tagline: initial?.tagline ?? "",
    description: initial?.description ?? "",
    location: initial?.location ?? "",
    website: initial?.website ?? "",
    founded_year: initial?.founded_year?.toString() ?? "",
    team_size: initial?.team_size?.toString() ?? "",
    mrr: initial?.mrr?.toString() ?? "",
    users_count: initial?.users_count?.toString() ?? "",
    traction_notes: initial?.traction_notes ?? "",
    use_of_funds: initial?.use_of_funds ?? "",
    deck_url: initial?.deck_url ?? "",
  });
  const [sector, setSector] = useState<string>(initial?.sector ?? "");
  const [stage, setStage] = useState<string>(initial?.stage ?? "");
  const [fundingIdx, setFundingIdx] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const supabase = createClient();
    const payload = {
      user_id: userId,
      ...form,
      sector,
      stage,
      funding_ask: FUNDING_OPTIONS[fundingIdx].value,
      founded_year: form.founded_year ? parseInt(form.founded_year) : null,
      team_size: form.team_size ? parseInt(form.team_size) : null,
      mrr: form.mrr ? parseInt(form.mrr) : null,
      users_count: form.users_count ? parseInt(form.users_count) : null,
      updated_at: new Date().toISOString(),
    };

    const { error } = initial
      ? await supabase.from("startup_profiles").update(payload).eq("user_id", userId)
      : await supabase.from("startup_profiles").insert(payload);

    setStatus(error ? "error" : "saved");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {/* Company Info */}
      <section className="bg-white border border-cream-dark rounded-sm p-6">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
          Company Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Company Name" value={form.company_name} onChange={set("company_name")} required />
          <Field label="Tagline" value={form.tagline} onChange={set("tagline")} placeholder="One punchy sentence" />
          <Field label="Website" value={form.website} onChange={set("website")} placeholder="https://..." />
          <Field label="Location" value={form.location} onChange={set("location")} placeholder="e.g. Abeokuta, Ogun" />
          <Field label="Founded Year" value={form.founded_year} onChange={set("founded_year")} placeholder="e.g. 2022" />
          <Field label="Team Size" value={form.team_size} onChange={set("team_size")} placeholder="e.g. 5" />
          <TextArea label="Description" value={form.description} onChange={set("description")} rows={4} placeholder="What do you build and for whom?" className="sm:col-span-2" />
        </div>
      </section>

      {/* Sector & Stage */}
      <section className="bg-white border border-cream-dark rounded-sm p-6">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
          Sector & Stage
        </h2>
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">Sector</label>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <button key={s} type="button" onClick={() => setSector(s)}
                  className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${sector === s ? "bg-forest text-cream border-forest" : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">Stage</label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <button key={s} type="button" onClick={() => setStage(s)}
                  className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${stage === s ? "bg-forest text-cream border-forest" : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="bg-white border border-cream-dark rounded-sm p-6">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
          Traction
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Monthly Revenue (₦)" value={form.mrr} onChange={set("mrr")} placeholder="e.g. 500000" />
          <Field label="Active Users / Customers" value={form.users_count} onChange={set("users_count")} placeholder="e.g. 1200" />
          <TextArea label="Traction Highlights" value={form.traction_notes} onChange={set("traction_notes")} rows={3} placeholder="Key milestones, partnerships, revenue growth" className="sm:col-span-2" />
        </div>
      </section>

      {/* Fundraising */}
      <section className="bg-white border border-cream-dark rounded-sm p-6">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 pb-2 border-b border-cream-dark">
          Fundraising
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">Funding Ask</label>
            <div className="flex flex-wrap gap-2">
              {FUNDING_OPTIONS.map((opt, i) => (
                <button key={opt.label} type="button" onClick={() => setFundingIdx(i)}
                  className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${fundingIdx === i ? "bg-forest text-cream border-forest" : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <TextArea label="Use of Funds" value={form.use_of_funds} onChange={set("use_of_funds")} rows={3} placeholder="How will you deploy the investment?" />
          <Field label="Pitch Deck URL" value={form.deck_url} onChange={set("deck_url")} placeholder="Google Drive / Docsend link" />
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
