import { createClient } from "@/lib/supabase/server";
import { StartupProfileForm } from "@/components/portal/startup-profile-form";

export default async function StartupProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("startup_profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Profile</p>
        <h1 className="text-3xl font-bold text-charcoal">Your Startup Profile</h1>
        <p className="text-muted text-sm mt-1">
          Complete your profile to be matched with investors. Reviewed by the AAN team before activation.
        </p>
      </div>
      <StartupProfileForm userId={user!.id} initial={profile} />
    </div>
  );
}
