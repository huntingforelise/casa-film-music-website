import { Body, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components';
import { ReactNode } from 'react';

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

/* ---- STYLES ---- */

const main = {
  backgroundColor: '#f5f5f5',
  padding: '40px 0',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px',
  borderRadius: '12px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
};

const brand = {
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '1px',
};

const divider = {
  margin: '24px 0',
  borderColor: '#eaeaea',
};

const footer = {
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#999',
};

const EmailLayout: React.FC<EmailLayoutProps> = ({ preview, children }) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Brand Header */}
        <Section style={header}>
          <Text style={brand}>Casa Film & Music</Text>
        </Section>

        <Hr style={divider} />

        {children}

        <Hr style={divider} />

        <Section style={footer}>
          <Text style={footerText}>This enquiry was submitted via casafilmandmusic.com</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailLayout;
