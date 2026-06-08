import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact message from {name} — AAN Website</Preview>
      <Body style={{ backgroundColor: "#faf7f0", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "4px", overflow: "hidden" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Heading style={{ color: "#c9a84c", fontSize: "18px", margin: 0 }}>
              Abeokuta Angels Network
            </Heading>
            <Text style={{ color: "#ffffff80", fontSize: "12px", margin: "4px 0 0" }}>
              New Contact Message
            </Text>
          </Section>
          <Section style={{ padding: "32px" }}>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1c1c1e", marginTop: 0 }}>
              {subject}
            </Heading>
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "12px", marginBottom: "4px" }}>FROM</Text>
            <Text style={{ color: "#1c1c1e", marginTop: 0 }}>
              {name} — <a href={`mailto:${email}`} style={{ color: "#1a4731" }}>{email}</a>
            </Text>
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "12px", marginBottom: "4px" }}>MESSAGE</Text>
            <Text style={{ color: "#1c1c1e", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Section>
          <Section style={{ backgroundColor: "#faf7f0", padding: "16px 32px" }}>
            <Text style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>
              Sent from abeokutaangels.ng — reply directly to this email to respond to {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
