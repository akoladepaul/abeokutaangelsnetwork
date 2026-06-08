import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { matchId } = await req.json();
    if (!matchId) return NextResponse.json({ error: "Missing matchId" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: match } = await supabase
      .from("matches")
      .select("id, investor_profile:investor_profiles(user_id)")
      .eq("id", matchId)
      .single();

    const investorProfile = match?.investor_profile as unknown as { user_id: string } | null;
    if (investorProfile?.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await supabase
      .from("matches")
      .update({ status: "passed", updated_at: new Date().toISOString() })
      .eq("id", matchId);

    return NextResponse.json({ success: true, status: "passed" });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
