import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { InterestNotificationEmail } from "@/emails/interest-notification";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? ""); }

export async function POST(req: NextRequest) {
  try {
    const { matchId } = await req.json();
    if (!matchId) return NextResponse.json({ error: "Missing matchId" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch match with both profiles joined
    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select(`
        id, status, investor_id, startup_id,
        investor_profile:investor_profiles(full_name, user_id),
        startup_profile:startup_profiles(company_name, user_id)
      `)
      .eq("id", matchId)
      .single();

    if (matchError || !match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Verify caller is the investor on this match
    const investorProfile = match.investor_profile as unknown as { full_name: string | null; user_id: string } | null;
    if (investorProfile?.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update match status to interested
    const { error: updateError } = await supabase
      .from("matches")
      .update({ status: "interested", updated_at: new Date().toISOString() })
      .eq("id", matchId);

    if (updateError) throw updateError;

    // Get startup user's email for notification
    const startupProfile = match.startup_profile as unknown as { company_name: string | null; user_id: string } | null;
    if (startupProfile?.user_id) {
      const { data: startupUser } = await supabase.auth.admin.getUserById(startupProfile.user_id);
      const startupEmail = startupUser?.user?.email;
      const investorName = investorProfile?.full_name ?? "An investor";
      const companyName = startupProfile?.company_name ?? "your startup";

      if (startupEmail && process.env.RESEND_API_KEY) {
        await getResend().emails.send({
          from: "Abeokuta Angels Network <hello@abeokutaangels.ng>",
          to: [startupEmail],
          subject: `An investor is interested in ${companyName}`,
          react: InterestNotificationEmail({ investorName, companyName }),
        });
      }
    }

    return NextResponse.json({ success: true, status: "interested" });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
