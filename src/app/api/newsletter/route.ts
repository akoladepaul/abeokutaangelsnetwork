import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? ""); }
const TO_EMAIL = process.env.AAN_ADMIN_EMAIL ?? "hello@abeokutaangels.ng";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Notify admin of new subscriber
    await getResend().emails.send({
      from: "AAN Website <noreply@abeokutaangels.ng>",
      to: [TO_EMAIL],
      subject: `New newsletter subscriber: ${email}`,
      text: `New subscriber: ${email}\n\nAdd to mailing list.`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
