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

interface InvestorAppEmailProps {
  name: string;
  email: string;
  role: string;
  sectors: string;
  stage: string;
  ticketSize: string;
  whyAAN: string;
}

export function InvestorApplicationEmail(props: InvestorAppEmailProps) {
  const rows: [string, string][] = [
    ["Name", props.name],
    ["Email", props.email],
    ["Role", props.role],
    ["Sectors", props.sectors],
    ["Stage Preference", props.stage],
    ["Ticket Size", props.ticketSize],
  ];

  return (
    <Html>
      <Head />
      <Preview>New investor application — {props.name}</Preview>
      <Body style={{ backgroundColor: "#faf7f0", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "4px" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Heading style={{ color: "#c9a84c", fontSize: "18px", margin: 0 }}>
              New Investor Application
            </Heading>
            <Text style={{ color: "#ffffff80", fontSize: "12px", margin: "4px 0 0" }}>
              Abeokuta Angels Network
            </Text>
          </Section>
          <Section style={{ padding: "32px" }}>
            {rows.map(([label, value]) => (
              <div key={label}>
                <Text style={{ color: "#6b7280", fontSize: "11px", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {label}
                </Text>
                <Text style={{ color: "#1c1c1e", marginTop: 0, marginBottom: "16px" }}>{value || "—"}</Text>
              </div>
            ))}
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px", textTransform: "uppercase" }}>
              Why AAN?
            </Text>
            <Text style={{ color: "#1c1c1e", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {props.whyAAN}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function InvestorApplicationConfirmEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Application received — Abeokuta Angels Network</Preview>
      <Body style={{ backgroundColor: "#faf7f0", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "4px" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Heading style={{ color: "#c9a84c", fontSize: "18px", margin: 0 }}>
              Abeokuta Angels Network
            </Heading>
          </Section>
          <Section style={{ padding: "32px" }}>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1c1c1e", marginTop: 0 }}>
              Application received, {name}.
            </Heading>
            <Text style={{ color: "#374151", lineHeight: "1.7" }}>
              Thank you for applying to join Abeokuta Angels Network as an investor member.
              We review all applications personally and will be in touch within 5–7 business
              days to schedule a screening call.
            </Text>
            <Text style={{ color: "#374151", lineHeight: "1.7" }}>
              In the meantime, feel free to reply to this email with any questions.
            </Text>
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "13px" }}>
              Capital is a vote of confidence. Abeokuta is ready for one.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
