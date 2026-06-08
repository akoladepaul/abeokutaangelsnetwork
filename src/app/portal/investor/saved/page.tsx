import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

export default async function InvestorSavedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: investorProfile } = await supabase
    .from("investor_profiles").select("id").eq("user_id", user!.id).single();

  const { data: saved } = investorProfile
    ? await supabase
        .from("saved_startups")
        .select("*, startup_profile:startup_profiles(*)")
        .eq("investor_id", investorProfile.id)
        .order("created_at", { ascending: false })
    : { data: null };

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Saved</p>
        <h1 className="text-3xl font-bold text-charcoal">Bookmarked Startups</h1>
        <p className="text-muted text-sm mt-1">Startups you&apos;ve saved for later review.</p>
      </div>

      {!saved || saved.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-dark rounded-sm">
          <Bookmark size={24} className="text-muted mx-auto mb-3" />
          <p className="font-medium text-charcoal">No saved startups yet.</p>
          <p className="text-muted text-sm mt-1">Bookmark startups from your deal flow or search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saved.map((s) => {
            const startup = s.startup_profile;
            if (!startup) return null;
            return (
              <div key={s.id} className="bg-white border border-cream-dark rounded-sm p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-forest/10 rounded-sm flex items-center justify-center">
                    <span className="text-forest font-bold">{(startup.company_name ?? "?")[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{startup.company_name}</h3>
                    <p className="text-muted text-xs">{startup.tagline}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {startup.sector && <Badge variant="sector">{startup.sector}</Badge>}
                  {startup.stage && <Badge variant="stage">{startup.stage}</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
