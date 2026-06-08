import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { ConnectedNotificationEmail } from "@/emails/connected-notification";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? ""); }

export async function POST(req: NextRequest) {
  try {
    const { matchId } = await req.json();
    if (!matchId) return NextResponse.json({ error: "Missing matchId" }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch match with profiles
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

    // Verify caller is the startup on this match
    const startupProfile = match.startup_profile as unknown as { company_name: string | null; user_id: string } | null;
    if (startupProfile?.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Match must be in "interested" state (investor already expressed interest)
    if (match.status !== "interested") {
      return NextResponse.json({ error: "Match is not in interested state" }, { status: 400 });
    }

    // Upgrade to connected
    const { error: updateError } = await supabase
      .from("matches")
      .update({ status: "connected", updated_at: new Date().toISOString() })
      .eq("id", matchId);

    if (updateError) throw updateError;

    // Notify both parties
    const investorProfile = match.investor_profile as unknown as { full_name: string | null; user_id: string } | null;
    const investorName = investorProfile?.full_name ?? "An investor";
    const companyName = startupProfile?.company_name ?? "the startup";

    if (process.env.RESEND_API_KEY) {
      const emailPromises: Promise<unknown>[] = [];

      // Notify investor
      if (investorProfile?.user_id) {
        const { data: investorUser } = await supabase.auth.admin.getUserById(investorProfile.user_id);
        const investorEmail = investorUser?.user?.email;
        if (investorEmail) {
          emailPromises.push(
            getResend().emails.send({
              from: "Abeokuta Angels Network <hello@abeokutaangels.ng>",
              to: [investorEmail],
              subject: `You're now connected with ${companyName}`,
              react: ConnectedNotificationEmail({ name: investorName, otherParty: companyName, role: "investor", matchId }),
            })
          );
        }
      }

      // Notify startup founder
      if (startupProfile?.user_id) {
        const { data: startupUser } = await supabase.auth.admin.getUserById(startupProfile.user_id);
        const startupEmail = startupUser?.user?.email;
        if (startupEmail) {
          emailPromises.push(
            getResend().emails.send({
              from: "Abeokuta Angels Network <hello@abeokutaangels.ng>",
              to: [startupEmail],
              subject: `You're now connected with ${investorName}`,
              react: ConnectedNotificationEmail({ name: companyName, otherParty: investorName, role: "startup", matchId }),
            })
          );
        }
      }

      await Promise.all(emailPromises);
    }

    return NextResponse.json({ success: true, status: "connected" });
  } catch {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
