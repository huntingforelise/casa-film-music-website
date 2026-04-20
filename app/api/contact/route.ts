import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Resend } from 'resend';
import ContactEmail from '@/app/emails/ContactEmail';
import { validateSpamProtection } from '@/lib/spam-protection';
import { verifyTurnstileToken } from '@/lib/turnstile/server';
import {
  contactFormLimiters,
  enforceSubmissionLimits,
  getSubmissionIdentifier,
} from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, message, website, submittedAt, turnstileToken } = await req.json();

    const spamCheck = validateSpamProtection({ website, submittedAt });
    if (!spamCheck.ok) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const identifier = getSubmissionIdentifier(req, 'contact', email);
    const rateLimitCheck = await enforceSubmissionLimits(contactFormLimiters, identifier);
    if (!rateLimitCheck.ok) {
      return NextResponse.json({ ok: false, error: rateLimitCheck.error }, { status: 429 });
    }

    const turnstileCheck = await verifyTurnstileToken(req, turnstileToken);
    if (!turnstileCheck.ok) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Trim all input once
    const cleanedName = name?.trim() ?? '';
    const cleanedEmail = email?.trim() ?? '';
    const cleanedMessage = message?.trim() ?? '';

    if (!cleanedName || !cleanedEmail || !cleanedMessage) {
      return NextResponse.json(
        { ok: false, error: 'Please complete all required fields.' },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('contacts').insert([
      {
        name: cleanedName,
        email: cleanedEmail,
        message: cleanedMessage,
      },
    ]);

    if (dbError) {
      console.error('Contact insert error:', dbError?.message);
      return NextResponse.json({ ok: false, error: dbError.message }, { status: 500 });
    }

    // Send email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      replyTo: cleanedEmail,
      subject: `New Contact Form Submission from ${cleanedName}`,
      react: await ContactEmail({
        name: cleanedName,
        email: cleanedEmail,
        message: cleanedMessage,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
};
