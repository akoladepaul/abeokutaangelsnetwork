import { createClient } from "@/lib/supabase/server";
import { MessagesView } from "@/components/portal/messages-view";

export default async function InvestorMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ match?: string }>;
}) {
  const { match: initialMatchId } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: investorProfile } = await supabase
    .from("investor_profiles").select("id").eq("user_id", user!.id).single();

  const { data: matches } = investorProfile
    ? await supabase
        .from("matches")
        .select("id, startup_profile:startup_profiles(company_name)")
        .eq("investor_id", investorProfile.id)
        .eq("status", "connected")
    : { data: null };

  const conversations = (matches ?? []).map((m) => {
    const sp = m.startup_profile as unknown as { company_name: string | null } | null;
    return {
      matchId: m.id,
      otherPartyName: sp?.company_name ?? "Startup",
      otherPartyInitial: (sp?.company_name ?? "S")[0],
      unread: 0,
    };
  });

  return (
    <div>
      <div className="mb-6">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Messages</p>
        <h1 className="text-3xl font-bold text-charcoal">Conversations</h1>
      </div>
      <MessagesView conversations={conversations} userId={user!.id} initialMatchId={initialMatchId ?? null} />
    </div>
  );
}
