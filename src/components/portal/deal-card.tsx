"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  MapPin,
  Users,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface DealCardProps {
  match: {
    id: string;
    score: number;
    status: string;
    investor_seen: boolean;
  };
  startup: {
    id: string;
    company_name: string | null;
    tagline: string | null;
    sector: string | null;
    stage: string | null;
    location: string | null;
    team_size: number | null;
    funding_ask: number | null;
    traction_notes: string | null;
    website: string | null;
  } | null;
}

export function DealCard({ match, startup }: DealCardProps) {
  const [status, setStatus] = useState(match.status);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  if (!startup) return null;

  async function updateStatus(newStatus: string) {
    setLoading(newStatus);
    const supabase = createClient();
    await supabase
      .from("matches")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", match.id);
    setStatus(newStatus);
    setLoading(null);
  }

  const formatCurrency = (n: number | null) => {
    if (!n) return "—";
    return n >= 1_000_000
      ? `₦${(n / 1_000_000).toFixed(0)}M`
      : `₦${(n / 1_000).toFixed(0)}K`;
  };

  const scoreColor =
    match.score >= 70
      ? "text-green-700 bg-green-50 border-green-200"
      : match.score >= 40
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-muted bg-cream border-cream-dark";

  return (
    <div
      className={cn(
        "bg-white border rounded-sm p-6 transition-all",
        status === "passed" ? "opacity-50 border-cream-dark" : "border-cream-dark hover:shadow-md hover:border-gold/30"
      )}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-forest/10 rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="text-forest font-bold text-lg">
              {(startup.company_name ?? "?")[0]}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-charcoal text-lg leading-tight">
              {startup.company_name ?? "Unnamed Startup"}
            </h3>
            <p className="text-muted text-sm mt-0.5">{startup.tagline ?? ""}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {startup.sector && <Badge variant="sector">{startup.sector}</Badge>}
              {startup.stage && <Badge variant="stage">{startup.stage}</Badge>}
            </div>
          </div>
        </div>

        {/* Match score */}
        <div className={cn("text-center px-3 py-1.5 rounded-sm border text-xs font-bold", scoreColor)}>
          <p className="text-lg font-bold leading-none">{match.score}</p>
          <p className="text-xs font-medium opacity-70">match</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-5 mt-4 text-sm text-muted">
        {startup.location && (
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />{startup.location}
          </span>
        )}
        {startup.team_size && (
          <span className="flex items-center gap-1.5">
            <Users size={13} />{startup.team_size} team
          </span>
        )}
        {startup.funding_ask && (
          <span className="flex items-center gap-1.5">
            <DollarSign size={13} />Seeking {formatCurrency(startup.funding_ask)}
          </span>
        )}
      </div>

      {startup.traction_notes && (
        <p className="text-sm text-charcoal/70 mt-3 leading-relaxed line-clamp-2">
          {startup.traction_notes}
        </p>
      )}

      {/* Actions */}
      {status !== "passed" && (
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-cream-dark flex-wrap">
          {status === "connected" ? (
            <Link href={`/portal/investor/messages?match=${match.id}`}>
              <Button variant="primary" size="sm" className="gap-2">
                <MessageSquare size={14} /> Open Chat
              </Button>
            </Link>
          ) : status === "interested" ? (
            <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-sm">
              Interest expressed — awaiting startup response
            </span>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                className="gap-2"
                onClick={() => updateStatus("interested")}
                disabled={loading === "interested"}
              >
                <ThumbsUp size={14} />
                {loading === "interested" ? "Saving…" : "Express Interest"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted hover:text-red-600"
                onClick={() => updateStatus("passed")}
                disabled={loading === "passed"}
              >
                <ThumbsDown size={14} /> Pass
              </Button>
            </>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="text-muted hover:text-gold transition-colors"
              title="Save"
            >
              {saved ? <BookmarkCheck size={18} className="text-gold" /> : <Bookmark size={18} />}
            </button>
            {startup.website && startup.website !== "#" && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-forest transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
