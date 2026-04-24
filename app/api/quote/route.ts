import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Resend } from 'resend';
import BookingEnquiryEmail from '@/app/emails/BookingEnquiryEmail';
import { validateSpamProtection } from '@/lib/spam-protection';
import { verifyTurnstileToken } from '@/lib/turnstile/server';
import {
  bookingFormLimiters,
  enforceSubmissionLimits,
  getSubmissionIdentifier,
} from '@/lib/rate-limit';

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
      guestCount,
      venue,
      travelRegion,
      services,
      bundleCode,
      addOns,
      notes,
      estimateTotal,
      website,
      submittedAt,
      turnstileToken,
    } = payload;

    const spamCheck = validateSpamProtection({ website, submittedAt });
    if (!spamCheck.ok) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const rateLimitCheck = await enforceSubmissionLimits(bookingFormLimiters, {
      ip: getSubmissionIdentifier(req, 'booking'),
      ipEmail: getSubmissionIdentifier(req, 'booking', email),
    });
    if (!rateLimitCheck.ok) {
      return NextResponse.json({ ok: false, error: rateLimitCheck.error }, { status: 429 });
    }

    const turnstileCheck = await verifyTurnstileToken(req, turnstileToken);
    if (!turnstileCheck.ok) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Clean inputs once
    const cleanedName = name?.trim() ?? '';
    const cleanedEmail = email?.trim() ?? '';
    const cleanedPhone = phone?.trim() ?? '';
    const cleanedVenue = venue?.trim() ?? '';
    const cleanedServices = Array.isArray(services) ? services : [];
    const cleanedAddOns = Array.isArray(addOns) ? addOns : [];
    const cleanedNotes = notes?.trim() ?? null;
    const cleanedEstimateTotal = typeof estimateTotal === 'number' ? estimateTotal : null;

    // Validate required fields
    if (
      !cleanedName ||
      !cleanedEmail ||
      !cleanedPhone ||
      !eventType?.trim() ||
      !eventDate?.trim() ||
      !travelRegion?.trim() ||
      cleanedServices.length === 0 ||
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
        guest_count: guestCount,
        venue: cleanedVenue,
        travel_region: travelRegion,
        services: cleanedServices,
        bundle_code: bundleCode || null,
        add_ons: cleanedAddOns,
        notes: cleanedNotes,
        estimate_total: cleanedEstimateTotal,
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
        guestCount,
        venue: cleanedVenue || undefined,
        travelRegion,
        services: cleanedServices,
        bundleCode: bundleCode || null,
        addOns: cleanedAddOns,
        notes: cleanedNotes,
        estimateTotal: cleanedEstimateTotal,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
};
