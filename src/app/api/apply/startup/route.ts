import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { StartupApplicationEmail, StartupApplicationConfirmEmail } from "@/emails/startup-application";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? ""); }
const TO_EMAIL = process.env.AAN_ADMIN_EMAIL ?? "hello@abeokutaangels.ng";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      company: companyName,
      founderName,
      founderEmail: email,
      sector,
      stage,
      fundingAsk,
      oneliner,
      traction,
      deckLink,
    } = body;

    if (!companyName || !founderName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await getResend().emails.send({
      from: "AAN Applications <noreply@abeokutaangels.ng>",
      to: [TO_EMAIL],
      subject: `[Startup Pitch] ${companyName} — ${sector}`,
      react: StartupApplicationEmail({ companyName, founderName, email, sector, stage, fundingAsk, oneliner, traction, deckLink }),
    });

    await getResend().emails.send({
      from: "Abeokuta Angels Network <hello@abeokutaangels.ng>",
      to: [email],
      subject: `Pitch received — ${companyName} | Abeokuta Angels Network`,
      react: StartupApplicationConfirmEmail({ founderName, companyName }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
