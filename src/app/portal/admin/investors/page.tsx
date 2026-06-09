import { createClient } from "@/lib/supabase/server";
import { ApprovalButtons } from "@/components/portal/approval-buttons";

export default async function AdminInvestorsPage() {
  const supabase = await createClient();

  const { data: investors } = await supabase
    .from("investor_profiles")
    .select("id, user_id, full_name, headline, sectors, stages, ticket_min, ticket_max, linkedin_url, updated_at")
    .order("updated_at", { ascending: false });

  // Get approval status for each investor user
  const userIds = (investors ?? []).map((i) => i.user_id);
  const { data: profileStatuses } = userIds.length > 0
    ? await supabase
        .from("profiles")
        .select("id, approved")
        .in("id", userIds)
    : { data: [] };

  const approvedSet = new Set((profileStatuses ?? []).filter((p) => p.approved).map((p) => p.id));

  const pending = (investors ?? []).filter((i) => !approvedSet.has(i.user_id));
  const approved = (investors ?? []).filter((i) => approvedSet.has(i.user_id));

  const formatMoney = (n: number) =>
    n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(0)}M` : `₦${(n / 1_000).toFixed(0)}K`;

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-3xl font-bold text-charcoal">Investor Approvals</h1>
        <p className="text-muted text-sm mt-1">
          Approve investors to grant access to the deal flow and matching platform.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gold rounded-full" />
          Pending Review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-muted text-sm">No investors pending review.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((inv) => (
              <InvestorRow key={inv.id} investor={inv} approved={false} formatMoney={formatMoney} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-forest rounded-full" />
          Approved ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-muted text-sm">No approved investors yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {approved.map((inv) => (
              <InvestorRow key={inv.id} investor={inv} approved={true} formatMoney={formatMoney} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function InvestorRow({ investor, approved, formatMoney }: {
  investor: {
    id: string; user_id: string; full_name: string | null; headline: string | null;
    sectors: string[]; stages: string[]; ticket_min: number; ticket_max: number;
    linkedin_url: string | null;
  };
  approved: boolean;
  formatMoney: (n: number) => string;
}) {
  return (
    <div className="bg-white border border-cream-dark rounded-sm p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-charcoal">{investor.full_name ?? "Profile Incomplete"}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {approved ? "Approved" : "Pending"}
            </span>
          </div>
          {investor.headline && <p className="text-muted text-sm mb-2">{investor.headline}</p>}
          <div className="flex flex-wrap gap-2 mb-1">
            {investor.sectors.slice(0, 4).map((s) => (
              <span key={s} className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted">
            <span>Stages: {investor.stages.join(", ") || "—"}</span>
            <span>Ticket: {formatMoney(investor.ticket_min)} – {formatMoney(investor.ticket_max)}</span>
            {investor.linkedin_url && (
              <a href={investor.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">LinkedIn ↗</a>
            )}
          </div>
        </div>

        <ApprovalButtons userId={investor.user_id} type="investor" currentlyApproved={approved} />
      </div>
    </div>
  );
}
