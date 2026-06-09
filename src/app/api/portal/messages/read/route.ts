import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { matchId } = await req.json();
    if (!matchId) return NextResponse.json({ error: "Missing matchId" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Mark all unread messages in this match NOT sent by the current user as read
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("match_id", matchId)
      .eq("read", false)
      .neq("sender_id", user.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
