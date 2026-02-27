import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const isEmail = (value: string) => /.+@.+\..+/.test(value);

export const POST = async (request: Request) => {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const subject = (body.subject || '').trim();
  const message = (body.message || '').trim();
  const website = (body.website || '').trim();

  if (website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, error: 'Please fill in all required fields.' }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please provide a valid email address.' }, { status: 400 });
  }

  console.log('[ContactFormSubmission]', {
    name,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
};
