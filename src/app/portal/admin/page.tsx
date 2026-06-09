import { createClient } from "@/lib/supabase/server";
import { Users, Briefcase, TrendingUp, MessageSquare, CheckCircle, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalInvestors },
    { count: approvedInvestors },
    { count: totalStartups },
    { count: approvedStartups },
    { count: totalMatches },
    { count: connectedMatches },
    { count: totalMessages },
  ] = await Promise.all([
    supabase.from("investor_profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "investor").eq("approved", true),
    supabase.from("startup_profiles").select("*", { count: "exact", head: true }),
    supabase.from("startup_profiles").select("*", { count: "exact", head: true }).eq("approved", true),
    supabase.from("matches").select("*", { count: "exact", head: true }),
    supabase.from("matches").select("*", { count: "exact", head: true }).eq("status", "connected"),
    supabase.from("messages").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Total Investors", value: totalInvestors ?? 0, sub: `${approvedInvestors ?? 0} approved`, icon: Users, color: "text-forest" },
    { label: "Total Startups", value: totalStartups ?? 0, sub: `${approvedStartups ?? 0} approved`, icon: Briefcase, color: "text-gold" },
    { label: "Total Matches", value: totalMatches ?? 0, sub: `${connectedMatches ?? 0} connected`, icon: TrendingUp, color: "text-blue-600" },
    { label: "Messages Sent", value: totalMessages ?? 0, sub: "across all threads", icon: MessageSquare, color: "text-purple-600" },
  ];

  // Pending approvals
  const { data: pendingInvestors } = await supabase
    .from("profiles")
    .select("id, created_at")
    .eq("role", "investor")
    .eq("approved", false)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: pendingStartups } = await supabase
    .from("startup_profiles")
    .select("id, company_name, sector, stage, user_id")
    .eq("approved", false)
    .order("updated_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-3xl font-bold text-charcoal">Platform Dashboard</h1>
        <p className="text-muted text-sm mt-1">Overview of the AAN matching platform.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-cream-dark rounded-sm p-5">
            <Icon size={20} className={`${color} mb-2`} />
            <p className="text-2xl font-bold text-charcoal">{value}</p>
            <p className="text-xs font-medium text-charcoal/80 mt-0.5">{label}</p>
            <p className="text-xs text-muted mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Pending approval summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending investors */}
        <div className="bg-white border border-cream-dark rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-charcoal text-sm flex items-center gap-2">
              <Clock size={15} className="text-gold" /> Pending Investor Approvals
            </h2>
            <a href="/portal/admin/investors" className="text-xs text-forest hover:underline">View all →</a>
          </div>
          {!pendingInvestors?.length ? (
            <p className="text-xs text-muted flex items-center gap-1.5"><CheckCircle size={12} className="text-green-600" /> All investors reviewed</p>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingInvestors.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-cream-dark/50 last:border-0">
                  <p className="text-xs text-charcoal font-mono">{p.id.slice(0, 8)}…</p>
                  <p className="text-xs text-muted">{new Date(p.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending startups */}
        <div className="bg-white border border-cream-dark rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-charcoal text-sm flex items-center gap-2">
              <Clock size={15} className="text-gold" /> Pending Startup Approvals
            </h2>
            <a href="/portal/admin/startups" className="text-xs text-forest hover:underline">View all →</a>
          </div>
          {!pendingStartups?.length ? (
            <p className="text-xs text-muted flex items-center gap-1.5"><CheckCircle size={12} className="text-green-600" /> All startups reviewed</p>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingStartups.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-cream-dark/50 last:border-0">
                  <p className="text-sm font-medium text-charcoal">{s.company_name ?? "Unnamed"}</p>
                  <div className="flex gap-2">
                    {s.sector && <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">{s.sector}</span>}
                    {s.stage && <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{s.stage}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
