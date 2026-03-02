import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot spam check
    if (website) return NextResponse.json({ ok: false, error: 'Bot detected' }, { status: 400 });

    const { error } = await supabase.from('contacts').insert([{ name, email, message }]);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
