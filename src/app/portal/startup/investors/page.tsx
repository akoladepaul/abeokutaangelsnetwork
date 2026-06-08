import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default async function StartupInvestorsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: startupProfile } = await supabase
    .from("startup_profiles").select("id, approved").eq("user_id", user!.id).single();

  const { data: matches } = startupProfile
    ? await supabase
        .from("matches")
        .select("id, score, status, investor_profile:investor_profiles(id, full_name, headline, sectors, stages, ticket_min, ticket_max)")
        .eq("startup_id", startupProfile.id)
        .order("score", { ascending: false })
    : { data: null };

  if (!startupProfile?.approved) {
    return (
      <div>
        <div className="mb-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Investors</p>
          <h1 className="text-3xl font-bold text-charcoal">Matched Investors</h1>
        </div>
        <div className="text-center py-20 bg-white border border-cream-dark rounded-sm">
          <Lock size={24} className="text-muted mx-auto mb-3" />
          <p className="font-medium text-charcoal">Profile under review</p>
          <p className="text-muted text-sm mt-1">Investor matches will appear here once your profile is approved.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Investors</p>
        <h1 className="text-3xl font-bold text-charcoal">Matched Investors</h1>
        <p className="text-muted text-sm mt-1">
          Investors matched to your startup. Names are revealed once you&apos;re connected.
        </p>
      </div>

      {!matches || matches.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-dark rounded-sm">
          <p className="font-medium text-charcoal">No matches yet.</p>
          <p className="text-muted text-sm mt-1">Matches are generated automatically once your profile is approved.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m) => {
            const investor = m.investor_profile as unknown as {
              id: string; full_name: string | null; headline: string | null;
              sectors: string[]; stages: string[]; ticket_min: number; ticket_max: number;
            } | null;
            const connected = m.status === "connected";
            return (
              <div key={m.id} className="bg-white border border-cream-dark rounded-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-forest font-bold">
                        {connected && investor?.full_name ? investor.full_name[0] : "?"}
                      </span>
                    </div>
                    <div>
                      <p className={`font-semibold text-charcoal text-sm ${!connected ? "blur-sm select-none" : ""}`}>
                        {connected && investor?.full_name ? investor.full_name : "Anonymous Investor"}
                      </p>
                      <p className={`text-xs text-muted ${!connected ? "blur-sm select-none" : ""}`}>
                        {connected && investor?.headline ? investor.headline : "Angel Investor"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted">Match</p>
                    <p className={`font-bold text-sm ${m.score >= 70 ? "text-forest" : m.score >= 40 ? "text-gold" : "text-muted"}`}>
                      {m.score}%
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(investor?.sectors ?? []).slice(0, 3).map((s) => (
                    <Badge key={s} variant="sector">{s}</Badge>
                  ))}
                  {(investor?.stages ?? []).slice(0, 2).map((s) => (
                    <Badge key={s} variant="stage">{s}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted">
                    Ticket: ₦{((investor?.ticket_min ?? 0) / 1_000_000).toFixed(0)}M – ₦{((investor?.ticket_max ?? 0) / 1_000_000).toFixed(0)}M
                  </p>
                  {m.status === "interested" && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">Interested</span>
                  )}
                  {m.status === "connected" && (
                    <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full font-medium">Connected</span>
                  )}
                  {m.status === "passed" && (
                    <span className="text-xs bg-cream text-muted px-2 py-0.5 rounded-full">Passed</span>
                  )}
                </div>

                {!connected && (
                  <p className="text-xs text-muted mt-3 flex items-center gap-1.5">
                    <Lock size={11} /> Investor details revealed when connected
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
