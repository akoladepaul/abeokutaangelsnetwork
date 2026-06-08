import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactNotificationEmail } from "@/emails/contact-notification";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? ""); }
const TO_EMAIL = process.env.AAN_ADMIN_EMAIL ?? "hello@abeokutaangels.ng";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await getResend().emails.send({
      from: "AAN Website <noreply@abeokutaangels.ng>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      react: ContactNotificationEmail({ name, email, subject, message }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
