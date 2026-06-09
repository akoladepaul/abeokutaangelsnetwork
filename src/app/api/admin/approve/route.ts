import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, approved, type } = await req.json() as {
      userId: string;
      approved: boolean;
      type: "investor" | "startup";
    };
    if (!userId || !type) return NextResponse.json({ error: "Missing params" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify caller is admin
    const { data: adminProfile } = await supabase
      .from("profiles").select("role").eq("id", user.id).single();
    if (adminProfile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Approve/reject the profile account
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ approved })
      .eq("id", userId);
    if (profileError) throw profileError;

    // For startups: also update the startup_profiles.approved flag
    // This triggers the match generation DB function when approved = true
    if (type === "startup") {
      await supabase
        .from("startup_profiles")
        .update({ approved })
        .eq("user_id", userId);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
