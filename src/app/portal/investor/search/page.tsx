import { createClient } from "@/lib/supabase/server";
import { SearchStartups } from "@/components/portal/search-startups";

export default async function InvestorSearchPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: investorProfile } = await supabase
    .from("investor_profiles")
    .select("id")
    .eq("user_id", user!.id)
    .single();

  const { data: startups } = await supabase
    .from("startup_profiles")
    .select("*")
    .eq("approved", true)
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Search</p>
        <h1 className="text-3xl font-bold text-charcoal">Browse Startups</h1>
        <p className="text-muted text-sm mt-1">All approved startups in the AAN pipeline.</p>
      </div>
      <SearchStartups startups={startups ?? []} investorProfileId={investorProfile?.id} />
    </div>
  );
}
