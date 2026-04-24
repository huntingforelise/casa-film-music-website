import { Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';
import { formatEuro } from '@/lib/booking/helpers';

interface BookingEnquiryEmailProps {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  venue?: string | null;
  travelRegion: string;
  services: string[];
  bundleCode?: string | null;
  addOns?: string[];
  notes?: string | null;
  estimateTotal?: number | null;
}

/* ---- Small UI blocks ---- */

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={label}>{children}</Text>
);

const Value: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style = {},
}) => <Text style={{ ...value, ...style }}>{children}</Text>;

const Divider: React.FC = () => (
  <Text style={{ margin: '20px 0', borderBottom: '1px solid #eee' }} />
);

/* ---- Styles ---- */

const heading: React.CSSProperties = {
  fontSize: 20,
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

const estimateValue: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  margin: '12px 0 16px',
};

const formatCurrency = (amount: number) => formatEuro(amount) ?? String(amount);

const BookingEnquiryEmail: React.FC<BookingEnquiryEmailProps> = ({
  name,
  email,
  phone,
  eventType,
  eventDate,
  guestCount,
  venue,
  travelRegion,
  services,
  bundleCode,
  addOns,
  notes,
  estimateTotal,
}) => (
  <EmailLayout preview={`New booking enquiry from ${name}`}>
    <Heading style={heading}>New Booking Enquiry</Heading>

    <Section>
      <Label>Name</Label>
      <Value>{name}</Value>

      <Label>Email</Label>
      <Value>{email}</Value>

      <Label>Phone</Label>
      <Value>{phone}</Value>

      <Divider />

      <Label>Event Type</Label>
      <Value>{eventType}</Value>

      <Label>Date</Label>
      <Value>{eventDate}</Value>

      <Label>Guest Count</Label>
      <Value>{guestCount}</Value>

      <Label>Venue</Label>
      <Value>{venue || 'Not provided'}</Value>

      <Label>Travel Region</Label>
      <Value>{travelRegion}</Value>

      <Divider />

      <Label>Services</Label>
      <Value>{services.join(', ')}</Value>

      <Label>Package</Label>
      <Value>{bundleCode || 'None'}</Value>

      <Label>Add-ons</Label>
      <Value>{addOns?.length ? addOns.join(', ') : 'None'}</Value>

      <Divider />

      <Label>Estimate</Label>
      {typeof estimateTotal === 'number' ? (
        <Text style={estimateValue}>{formatCurrency(estimateTotal)}</Text>
      ) : (
        <Value>Unknown</Value>
      )}

      <Divider />

      <Label>Notes</Label>
      <Value style={{ whiteSpace: 'pre-line' }}>{notes || 'None'}</Value>
    </Section>
  </EmailLayout>
);

export default BookingEnquiryEmail;
