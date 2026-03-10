import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Resend } from 'resend';
import BookingEnquiryEmail from '@/app/emails/BookingEnquiryEmail';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();

    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      startTime,
      durationHours,
      guestCount,
      venue,
      travelRegion,
      services,
      bundleCode,
      addOns,
      notes,
      website,
    } = payload;

    // Honeypot
    if (website?.trim()) {
      return NextResponse.json({ ok: false, error: 'Bot detected' }, { status: 400 });
    }

    // Clean inputs once
    const cleanedName = name?.trim() ?? '';
    const cleanedEmail = email?.trim() ?? '';
    const cleanedPhone = phone?.trim() ?? '';
    const cleanedVenue = venue?.trim() ?? '';
    const cleanedServices = Array.isArray(services) ? services : [];
    const cleanedAddOns = Array.isArray(addOns) ? addOns : [];
    const cleanedNotes = notes?.trim() ?? null;

    // Validate required fields
    if (
      !cleanedName ||
      !cleanedEmail ||
      !cleanedPhone ||
      !eventType?.trim() ||
      !eventDate?.trim() ||
      !cleanedVenue ||
      !travelRegion?.trim() ||
      cleanedServices.length === 0 ||
      typeof durationHours !== 'number' ||
      durationHours <= 0 ||
      typeof guestCount !== 'number' ||
      guestCount <= 0
    ) {
      return NextResponse.json(
        { ok: false, error: 'Please complete all required fields.' },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('booking_enquiries').insert([
      {
        name: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone,
        event_type: eventType,
        event_date: eventDate,
        start_time: startTime || null,
        duration_hours: durationHours,
        guest_count: guestCount,
        venue: cleanedVenue,
        travel_region: travelRegion,
        services: cleanedServices,
        bundle_code: bundleCode || null,
        add_ons: cleanedAddOns,
        notes: cleanedNotes,
      },
    ]);

    if (dbError) {
      console.error('Booking enquiry insert failed:', dbError.message);
      return NextResponse.json({ ok: false, error: dbError.message }, { status: 500 });
    }

    // Send email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      replyTo: cleanedEmail,
      subject: `New Booking Enquiry - ${cleanedName}`,
      react: await BookingEnquiryEmail({
        name: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone,
        eventType,
        eventDate,
        durationHours,
        guestCount,
        venue: cleanedVenue,
        travelRegion,
        services: cleanedServices,
        startTime: startTime || null,
        bundleCode: bundleCode || null,
        addOns: cleanedAddOns,
        notes: cleanedNotes,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
};
