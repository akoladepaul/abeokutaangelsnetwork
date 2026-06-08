import { createClient } from "@/lib/supabase/server";
import { InvestorProfileForm } from "@/components/portal/investor-profile-form";

export default async function InvestorProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("investor_profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Profile</p>
        <h1 className="text-3xl font-bold text-charcoal">Your Investor Profile</h1>
        <p className="text-muted text-sm mt-1">
          This information is used to match you with relevant startups. Visible to AAN team only until you connect with a startup.
        </p>
      </div>
      <InvestorProfileForm userId={user!.id} initial={profile} />
    </div>
  );
}
