import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { ApprovalButtons } from "@/components/portal/approval-buttons";

export default async function AdminStartupsPage() {
  const supabase = await createClient();

  const { data: startups } = await supabase
    .from("startup_profiles")
    .select("id, user_id, company_name, tagline, sector, stage, location, funding_ask, deck_url, website, approved, updated_at")
    .order("updated_at", { ascending: false });

  const pending = (startups ?? []).filter((s) => !s.approved);
  const approved = (startups ?? []).filter((s) => s.approved);

  const formatMoney = (n: number | null) =>
    n ? (n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(0)}M` : `₦${(n / 1_000).toFixed(0)}K`) : "—";

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-3xl font-bold text-charcoal">Startup Approvals</h1>
        <p className="text-muted text-sm mt-1">
          Approve startups to generate investor matches. Rejection prevents matching.
        </p>
      </div>

      {/* Pending */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gold rounded-full" />
          Pending Review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-muted text-sm">No startups pending review.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((s) => (
              <StartupRow key={s.id} startup={s} formatMoney={formatMoney} />
            ))}
          </div>
        )}
      </section>

      {/* Approved */}
      <section>
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-forest rounded-full" />
          Approved ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-muted text-sm">No approved startups yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {approved.map((s) => (
              <StartupRow key={s.id} startup={s} formatMoney={formatMoney} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StartupRow({ startup, formatMoney }: {
  startup: {
    id: string; user_id: string; company_name: string | null; tagline: string | null;
    sector: string | null; stage: string | null; location: string | null;
    funding_ask: number | null; deck_url: string | null; website: string | null;
    approved: boolean; updated_at: string;
  };
  formatMoney: (n: number | null) => string;
}) {
  return (
    <div className="bg-white border border-cream-dark rounded-sm p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-charcoal">{startup.company_name ?? "Unnamed"}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${startup.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {startup.approved ? "Approved" : "Pending"}
            </span>
          </div>
          {startup.tagline && <p className="text-muted text-sm mb-2">{startup.tagline}</p>}
          <div className="flex flex-wrap gap-2 mb-2">
            {startup.sector && <Badge variant="sector">{startup.sector}</Badge>}
            {startup.stage && <Badge variant="stage">{startup.stage}</Badge>}
            {startup.location && <span className="text-xs text-muted">{startup.location}</span>}
          </div>
          <div className="flex gap-4 text-xs text-muted">
            <span>Ask: {formatMoney(startup.funding_ask)}</span>
            {startup.deck_url && <a href={startup.deck_url} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">View Deck ↗</a>}
            {startup.website && <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">Website ↗</a>}
          </div>
        </div>

        <ApprovalButtons userId={startup.user_id} type="startup" currentlyApproved={startup.approved} />
      </div>
    </div>
  );
}
