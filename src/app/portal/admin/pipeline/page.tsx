import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-cream text-muted border-cream-dark",
  interested: "bg-amber-50 text-amber-700 border-amber-200",
  connected: "bg-green-50 text-green-700 border-green-200",
  passed: "bg-red-50 text-red-600 border-red-200",
};

export default async function AdminPipelinePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("matches")
    .select(`
      id, score, status, created_at, updated_at,
      investor_profile:investor_profiles(full_name),
      startup_profile:startup_profiles(company_name, sector, stage)
    `)
    .order("updated_at", { ascending: false });

  if (filterStatus && filterStatus !== "all") {
    query = query.eq("status", filterStatus);
  }

  const { data: matches } = await query;

  const counts = {
    all: matches?.length ?? 0,
    pending: matches?.filter((m) => m.status === "pending").length ?? 0,
    interested: matches?.filter((m) => m.status === "interested").length ?? 0,
    connected: matches?.filter((m) => m.status === "connected").length ?? 0,
    passed: matches?.filter((m) => m.status === "passed").length ?? 0,
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "interested", label: "Interested" },
    { key: "connected", label: "Connected" },
    { key: "passed", label: "Passed" },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-3xl font-bold text-charcoal">Deal Pipeline</h1>
        <p className="text-muted text-sm mt-1">All investor-startup matches across the platform.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(({ key, label }) => {
          const active = (filterStatus ?? "all") === key;
          return (
            <a
              key={key}
              href={`/portal/admin/pipeline?status=${key}`}
              className={`text-xs font-medium px-3 py-1.5 rounded-sm border transition-colors ${
                active
                  ? "bg-forest text-cream border-forest"
                  : "bg-white text-charcoal/70 border-cream-dark hover:border-forest/40"
              }`}
            >
              {label} <span className="opacity-60 ml-1">({counts[key as keyof typeof counts]})</span>
            </a>
          );
        })}
      </div>

      {/* Table */}
      {!matches || matches.length === 0 ? (
        <p className="text-muted text-sm">No matches found.</p>
      ) : (
        <div className="bg-white border border-cream-dark rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark bg-cream/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Startup</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Investor</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Sector</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Score</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m) => {
                  const startup = m.startup_profile as unknown as { company_name: string | null; sector: string | null; stage: string | null } | null;
                  const investor = m.investor_profile as unknown as { full_name: string | null } | null;
                  return (
                    <tr key={m.id} className="border-b border-cream-dark/50 hover:bg-cream/30 transition-colors last:border-0">
                      <td className="py-3 px-4">
                        <p className="font-medium text-charcoal">{startup?.company_name ?? "—"}</p>
                        {startup?.stage && <p className="text-xs text-muted">{startup.stage}</p>}
                      </td>
                      <td className="py-3 px-4 text-charcoal/80">{investor?.full_name ?? "—"}</td>
                      <td className="py-3 px-4">
                        {startup?.sector ? <Badge variant="sector">{startup.sector}</Badge> : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold text-sm ${m.score >= 70 ? "text-green-700" : m.score >= 40 ? "text-amber-600" : "text-muted"}`}>
                          {m.score}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLES[m.status] ?? ""}`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted">
                        {new Date(m.updated_at).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
