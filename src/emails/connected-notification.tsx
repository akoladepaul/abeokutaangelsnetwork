import {
  Html, Head, Body, Container, Section, Text, Heading, Hr, Link, Preview,
} from "@react-email/components";

interface Props {
  name: string;
  otherParty: string;
  role: "investor" | "startup";
  matchId: string;
}

export function ConnectedNotificationEmail({ name, otherParty, role, matchId }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://abeokutaangels.ng";
  const messagesUrl = role === "investor"
    ? `${appUrl}/portal/investor/messages?match=${matchId}`
    : `${appUrl}/portal/startup/messages?match=${matchId}`;

  const headline = role === "investor"
    ? `You're connected with ${otherParty}`
    : `${otherParty} accepted your interest`;

  return (
    <Html>
      <Head />
      <Preview>{headline} — start your conversation on AAN</Preview>
      <Body style={{ fontFamily: "Georgia, serif", backgroundColor: "#faf7f0", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", border: "1px solid #e8e0d0" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Text style={{ color: "#c9a84c", fontSize: "11px", fontFamily: "sans-serif", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 4px" }}>
              Abeokuta Angels Network
            </Text>
            <Heading style={{ color: "#faf7f0", fontSize: "20px", margin: 0, fontFamily: "Georgia, serif" }}>
              New Connection
            </Heading>
          </Section>

          <Section style={{ padding: "32px" }}>
            <Text style={{ color: "#2c2c2c", fontSize: "16px", lineHeight: "1.6", margin: "0 0 16px" }}>
              Hi {name},
            </Text>
            <Text style={{ color: "#5a5a5a", fontSize: "15px", lineHeight: "1.6", margin: "0 0 8px" }}>
              {headline}. You now have access to a private messaging channel on the AAN platform.
            </Text>
            <Text style={{ color: "#5a5a5a", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px" }}>
              Use the portal to introduce yourself, share materials, and explore next steps. The AAN team is available to facilitate if needed.
            </Text>

            <Link
              href={messagesUrl}
              style={{
                display: "inline-block",
                backgroundColor: "#1a4731",
                color: "#faf7f0",
                padding: "12px 28px",
                fontSize: "14px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                textDecoration: "none",
                letterSpacing: "0.5px",
              }}
            >
              Open Conversation →
            </Link>

            <Hr style={{ borderColor: "#e8e0d0", margin: "32px 0 24px" }} />

            <Text style={{ color: "#8a8a8a", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
              This connection was made through the AAN matching platform. If you have any concerns, contact us at hello@abeokutaangels.ng.
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#f5f0e8", padding: "20px 32px", borderTop: "1px solid #e8e0d0" }}>
            <Text style={{ color: "#8a8a8a", fontSize: "12px", fontFamily: "sans-serif", margin: 0, textAlign: "center" as const }}>
              Abeokuta Angels Network · Abeokuta, Ogun State, Nigeria
              <br />© {new Date().getFullYear()} Abeokuta Angels Network. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
