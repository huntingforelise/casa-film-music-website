import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot spam check
    if (website) return NextResponse.json({ ok: false, error: 'Bot detected' }, { status: 400 });

    // Insert into Supabase
    const { error } = await supabase.from('contacts').insert([{ name, email, message }]);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    // Send email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
