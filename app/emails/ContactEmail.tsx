import { Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

/* ---- Small reusable text blocks ---- */

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={label}>{children}</Text>
);

const Value: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style = {},
}) => <Text style={{ ...value, ...style }}>{children}</Text>;

/* ---- STYLES ---- */

const heading: React.CSSProperties = {
  fontSize: '20px',
  marginBottom: 24,
};

const label: React.CSSProperties = {
  fontSize: 12,
  textTransform: 'uppercase',
  color: '#888',
  marginBottom: 4,
};

const value: React.CSSProperties = {
  fontSize: 14,
  marginBottom: 16,
};

const ContactEmail: React.FC<ContactEmailProps> = ({ name, email, message }) => (
  <EmailLayout preview={`New contact submission from ${name}`}>
    <Heading style={heading}>New Contact Submission</Heading>

    <Section>
      <Label>Name</Label>
      <Value>{name}</Value>

      <Label>Email</Label>
      <Value>{email}</Value>

      <Label>Message</Label>
      <Value style={{ whiteSpace: 'pre-line' }}>{message}</Value>
    </Section>
  </EmailLayout>
);

export default ContactEmail;
