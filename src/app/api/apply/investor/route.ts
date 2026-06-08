import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { InvestorApplicationEmail, InvestorApplicationConfirmEmail } from "@/emails/investor-application";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? ""); }
const TO_EMAIL = process.env.AAN_ADMIN_EMAIL ?? "hello@abeokutaangels.ng";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, role, sectors, stage, ticketSize, whyAAN } = body;

    if (!firstName || !email || !whyAAN) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const name = `${firstName} ${lastName}`.trim();

    // Notify AAN team
    await getResend().emails.send({
      from: "AAN Applications <noreply@abeokutaangels.ng>",
      to: [TO_EMAIL],
      subject: `[Investor Application] ${name}`,
      react: InvestorApplicationEmail({ name, email, role, sectors, stage, ticketSize, whyAAN }),
    });

    // Confirm to applicant
    await getResend().emails.send({
      from: "Abeokuta Angels Network <hello@abeokutaangels.ng>",
      to: [email],
      subject: "Your investor application — Abeokuta Angels Network",
      react: InvestorApplicationConfirmEmail({ name }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
