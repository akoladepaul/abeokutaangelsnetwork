import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { startupId } = await req.json();
    if (!startupId) return NextResponse.json({ error: "Missing startupId" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: investorProfile } = await supabase
      .from("investor_profiles").select("id").eq("user_id", user.id).single();

    if (!investorProfile) return NextResponse.json({ error: "Investor profile not found" }, { status: 404 });

    const { error } = await supabase
      .from("saved_startups")
      .upsert({ investor_id: investorProfile.id, startup_id: startupId }, { onConflict: "investor_id,startup_id" });

    if (error) throw error;
    return NextResponse.json({ success: true, saved: true });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { startupId } = await req.json();
    if (!startupId) return NextResponse.json({ error: "Missing startupId" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: investorProfile } = await supabase
      .from("investor_profiles").select("id").eq("user_id", user.id).single();

    if (!investorProfile) return NextResponse.json({ error: "Investor profile not found" }, { status: 404 });

    await supabase
      .from("saved_startups")
      .delete()
      .eq("investor_id", investorProfile.id)
      .eq("startup_id", startupId);

    return NextResponse.json({ success: true, saved: false });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
