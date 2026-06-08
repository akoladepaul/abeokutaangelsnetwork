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

interface StartupAppEmailProps {
  companyName: string;
  founderName: string;
  email: string;
  sector: string;
  stage: string;
  fundingAsk: string;
  oneliner: string;
  traction: string;
  deckLink: string;
}

export function StartupApplicationEmail(props: StartupAppEmailProps) {
  const rows: [string, string][] = [
    ["Company", props.companyName],
    ["Founder", props.founderName],
    ["Email", props.email],
    ["Sector", props.sector],
    ["Stage", props.stage],
    ["Funding Ask", props.fundingAsk],
    ["Deck", props.deckLink || "Not provided"],
  ];

  return (
    <Html>
      <Head />
      <Preview>New startup pitch — {props.companyName}</Preview>
      <Body style={{ backgroundColor: "#faf7f0", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "4px" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Heading style={{ color: "#c9a84c", fontSize: "18px", margin: 0 }}>
              New Startup Pitch
            </Heading>
            <Text style={{ color: "#ffffff80", fontSize: "12px", margin: "4px 0 0" }}>
              Abeokuta Angels Network
            </Text>
          </Section>
          <Section style={{ padding: "32px" }}>
            {rows.map(([label, value]) => (
              <div key={label}>
                <Text style={{ color: "#6b7280", fontSize: "11px", marginBottom: "2px", textTransform: "uppercase" }}>
                  {label}
                </Text>
                <Text style={{ color: "#1c1c1e", marginTop: 0, marginBottom: "14px" }}>{value || "—"}</Text>
              </div>
            ))}
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px", textTransform: "uppercase" }}>
              One-liner
            </Text>
            <Text style={{ color: "#1c1c1e", fontStyle: "italic", marginTop: 0 }}>{props.oneliner}</Text>
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px", textTransform: "uppercase" }}>
              Traction
            </Text>
            <Text style={{ color: "#1c1c1e", lineHeight: "1.6", whiteSpace: "pre-wrap", marginTop: 0 }}>
              {props.traction || "Not provided"}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function StartupApplicationConfirmEmail({ founderName, companyName }: { founderName: string; companyName: string }) {
  return (
    <Html>
      <Head />
      <Preview>Pitch received — {companyName} | Abeokuta Angels Network</Preview>
      <Body style={{ backgroundColor: "#faf7f0", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "4px" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Heading style={{ color: "#c9a84c", fontSize: "18px", margin: 0 }}>
              Abeokuta Angels Network
            </Heading>
          </Section>
          <Section style={{ padding: "32px" }}>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1c1c1e", marginTop: 0 }}>
              Pitch received, {founderName}.
            </Heading>
            <Text style={{ color: "#374151", lineHeight: "1.7" }}>
              We&apos;ve received the pitch for <strong>{companyName}</strong>. Our deal team
              reviews every application and you&apos;ll hear from us within 2 weeks — either a
              pass with brief feedback, or an invitation to move forward.
            </Text>
            <Text style={{ color: "#374151", lineHeight: "1.7" }}>
              We don&apos;t do black holes. You will get a response.
            </Text>
            <Hr style={{ borderColor: "#f0ead8" }} />
            <Text style={{ color: "#6b7280", fontSize: "13px" }}>
              Abeokuta has brains, grit, and unfinished ambition.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
