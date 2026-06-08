import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { DealCard } from "@/components/portal/deal-card";
import { AlertCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function InvestorFeedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get investor profile
  const { data: investorProfile } = await supabase
    .from("investor_profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  // Get profile approval status
  const { data: profile } = await supabase
    .from("profiles")
    .select("approved")
    .eq("id", user!.id)
    .single();

  // Get matched startups sorted by score
  const { data: matches } = investorProfile
    ? await supabase
        .from("matches")
        .select(`
          *,
          startup_profile:startup_profiles(*)
        `)
        .eq("investor_id", investorProfile.id)
        .neq("status", "passed")
        .order("score", { ascending: false })
    : { data: null };

  // Stats
  const totalMatches = matches?.length ?? 0;
  const interested = matches?.filter((m) => m.status === "interested" || m.status === "connected").length ?? 0;
  const connected = matches?.filter((m) => m.status === "connected").length ?? 0;

  const profileIncomplete = !investorProfile?.full_name || !investorProfile?.sectors?.length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Investor Portal</p>
        <h1 className="text-3xl font-bold text-charcoal">
          {investorProfile?.full_name ? `Welcome back, ${investorProfile.full_name.split(" ")[0]}.` : "Deal Flow"}
        </h1>
        <p className="text-muted text-sm mt-1">Your curated investment opportunities.</p>
      </div>

      {/* Profile incomplete banner */}
      {profileIncomplete && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-amber-800 text-sm">Complete your investor profile</p>
            <p className="text-amber-700 text-xs mt-0.5">
              Add your sectors, stage preferences, and thesis to get accurate deal flow matches.
            </p>
          </div>
          <Link href="/portal/investor/profile">
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-800 hover:bg-amber-100">
              Complete Profile
            </Button>
          </Link>
        </div>
      )}

      {/* Pending approval banner */}
      {!profile?.approved && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-sm flex items-start gap-3">
          <AlertCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800 text-sm">Membership under review</p>
            <p className="text-blue-700 text-xs mt-0.5">
              Your investor membership application is being reviewed. You&apos;ll receive an email when approved.
              In the meantime, explore the platform and complete your profile.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Matched Startups", value: totalMatches, icon: <TrendingUp size={18} className="text-forest" /> },
          { label: "Expressed Interest", value: interested, icon: <TrendingUp size={18} className="text-gold" /> },
          { label: "Connected", value: connected, icon: <TrendingUp size={18} className="text-green-600" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white border border-cream-dark rounded-sm p-4">
            <div className="flex items-center gap-2 mb-1">{icon}</div>
            <p className="text-2xl font-bold text-charcoal">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Deal flow feed */}
      {!matches || matches.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-dark rounded-sm">
          <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-muted" />
          </div>
          <h3 className="font-bold text-charcoal mb-2">No matches yet.</h3>
          <p className="text-muted text-sm max-w-xs mx-auto mb-6">
            {profileIncomplete
              ? "Complete your investor profile so we can match you with relevant startups."
              : "We're working on matches based on your thesis. Check back soon — new startups are added regularly."}
          </p>
          {profileIncomplete ? (
            <Link href="/portal/investor/profile">
              <Button variant="primary">Complete Profile</Button>
            </Link>
          ) : (
            <Link href="/portal/investor/search">
              <Button variant="outline">Browse All Startups</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {matches.map((match) => (
            <DealCard
              key={match.id}
              match={match}
              startup={match.startup_profile}
            />
          ))}
        </div>
      )}
    </div>
  );
}
