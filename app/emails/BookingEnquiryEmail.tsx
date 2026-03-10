import { Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface BookingEnquiryEmailProps {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  durationHours: number;
  guestCount: number;
  venue: string;
  travelRegion: string;
  services: string[];
  startTime?: string | null;
  bundleCode?: string | null;
  addOns?: string[];
  notes?: string | null;
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

const BookingEnquiryEmail: React.FC<BookingEnquiryEmailProps> = ({
  name,
  email,
  phone,
  eventType,
  eventDate,
  durationHours,
  guestCount,
  venue,
  travelRegion,
  services,
  startTime,
  bundleCode,
  addOns,
  notes,
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

      <Label>Start Time</Label>
      <Value>{startTime || 'Not provided'}</Value>

      <Label>Duration</Label>
      <Value>{durationHours} hours</Value>

      <Label>Guest Count</Label>
      <Value>{guestCount}</Value>

      <Label>Venue</Label>
      <Value>{venue}</Value>

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

      <Label>Notes</Label>
      <Value style={{ whiteSpace: 'pre-line' }}>{notes || 'None'}</Value>
    </Section>
  </EmailLayout>
);

export default BookingEnquiryEmail;
