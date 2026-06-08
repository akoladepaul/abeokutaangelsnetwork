import {
  Html, Head, Body, Container, Section, Text, Heading, Hr, Link, Preview,
} from "@react-email/components";

interface Props {
  investorName: string;
  companyName: string;
}

export function InterestNotificationEmail({ investorName, companyName }: Props) {
  const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://abeokutaangels.ng"}/portal/startup/investors`;

  return (
    <Html>
      <Head />
      <Preview>An investor has expressed interest in {companyName}</Preview>
      <Body style={{ fontFamily: "Georgia, serif", backgroundColor: "#faf7f0", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", border: "1px solid #e8e0d0" }}>
          <Section style={{ backgroundColor: "#1a4731", padding: "24px 32px" }}>
            <Text style={{ color: "#c9a84c", fontSize: "11px", fontFamily: "sans-serif", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 4px" }}>
              Abeokuta Angels Network
            </Text>
            <Heading style={{ color: "#faf7f0", fontSize: "20px", margin: 0, fontFamily: "Georgia, serif" }}>
              Investor Interest
            </Heading>
          </Section>

          <Section style={{ padding: "32px" }}>
            <Text style={{ color: "#2c2c2c", fontSize: "16px", lineHeight: "1.6", margin: "0 0 16px" }}>
              Good news — an AAN investor has expressed interest in <strong>{companyName}</strong>.
            </Text>
            <Text style={{ color: "#5a5a5a", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px" }}>
              <strong>{investorName}</strong> has reviewed your profile and would like to connect. Log in to your portal to review their profile and accept the connection.
            </Text>

            <Link
              href={portalUrl}
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
              View Investor →
            </Link>

            <Hr style={{ borderColor: "#e8e0d0", margin: "32px 0 24px" }} />

            <Text style={{ color: "#8a8a8a", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
              Once you accept, a private messaging channel opens between you and the investor. All connections are facilitated through the AAN platform.
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
