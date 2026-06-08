"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StartupProfile } from "@/types/database";

const SECTORS = ["AgriTech", "EdTech", "FinTech", "Logistics", "HealthTech", "Creative Industries"];
const STAGES = ["Idea / Pre-product", "MVP / Beta", "Revenue-generating", "Scaling"];

interface Props {
  startups: StartupProfile[];
  investorProfileId?: string;
}

export function SearchStartups({ startups }: Props) {
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return startups.filter((s) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        s.company_name?.toLowerCase().includes(q) ||
        s.tagline?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q);
      const matchesSector = !sectorFilter || s.sector === sectorFilter;
      const matchesStage = !stageFilter || s.stage === stageFilter;
      return matchesQuery && matchesSector && matchesStage;
    });
  }, [startups, query, sectorFilter, stageFilter]);

  const formatCurrency = (n: number | null) => {
    if (!n) return null;
    return n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(0)}M` : `₦${(n / 1_000).toFixed(0)}K`;
  };

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search startups..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-white focus:outline-none focus:border-forest/60"
          />
        </div>
        <select
          value={sectorFilter ?? ""}
          onChange={(e) => setSectorFilter(e.target.value || null)}
          className="px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-white focus:outline-none focus:border-forest/60"
        >
          <option value="">All sectors</option>
          {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={stageFilter ?? ""}
          onChange={(e) => setStageFilter(e.target.value || null)}
          className="px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-white focus:outline-none focus:border-forest/60"
        >
          <option value="">All stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <p className="text-xs text-muted mb-4">{filtered.length} startup{filtered.length !== 1 ? "s" : ""} found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-cream-dark rounded-sm">
          <Filter size={24} className="text-muted mx-auto mb-3" />
          <p className="font-medium text-charcoal">No startups match your filters.</p>
          <button onClick={() => { setQuery(""); setSectorFilter(null); setStageFilter(null); }}
            className="text-forest text-sm mt-2 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((startup) => (
            <div key={startup.id} className="bg-white border border-cream-dark rounded-sm p-5 hover:shadow-md hover:border-gold/30 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-forest/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-forest font-bold">{(startup.company_name ?? "?")[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-charcoal truncate">{startup.company_name}</h3>
                  <p className="text-muted text-xs truncate">{startup.tagline}</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3 flex-wrap">
                {startup.sector && <Badge variant="sector">{startup.sector}</Badge>}
                {startup.stage && <Badge variant="stage">{startup.stage}</Badge>}
              </div>
              <div className="flex gap-4 text-xs text-muted">
                {startup.location && <span className="flex items-center gap-1"><MapPin size={11} />{startup.location}</span>}
                {startup.team_size && <span className="flex items-center gap-1"><Users size={11} />{startup.team_size} team</span>}
                {startup.funding_ask && <span className="font-medium text-forest">Seeking {formatCurrency(startup.funding_ask)}</span>}
              </div>
              {startup.traction_notes && (
                <p className="text-xs text-charcoal/60 mt-2 line-clamp-2">{startup.traction_notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
