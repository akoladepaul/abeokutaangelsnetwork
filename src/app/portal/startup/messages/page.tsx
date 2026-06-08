import { createClient } from "@/lib/supabase/server";
import { MessagesView } from "@/components/portal/messages-view";

export default async function StartupMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ match?: string }>;
}) {
  const { match: initialMatchId } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: startupProfile } = await supabase
    .from("startup_profiles").select("id").eq("user_id", user!.id).single();

  const { data: matches } = startupProfile
    ? await supabase
        .from("matches")
        .select("id, investor_profile:investor_profiles(full_name)")
        .eq("startup_id", startupProfile.id)
        .eq("status", "connected")
    : { data: null };

  const conversations = (matches ?? []).map((m) => {
    const ip = m.investor_profile as unknown as { full_name: string | null } | null;
    return {
      matchId: m.id,
      otherPartyName: ip?.full_name ?? "Investor",
      otherPartyInitial: (ip?.full_name ?? "I")[0],
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
