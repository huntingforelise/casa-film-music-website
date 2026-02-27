'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      subject: String(formData.get('subject') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
        return;
      }

      form.reset();
      setStatus('success');
      setMessage('Thanks, your message has been sent.');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <section className="py-8">
      <h2 className="font-display text-3xl font-medium tracking-tight text-text">Contact Form</h2>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm tracking-tight text-text/80">
            Name
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              className="rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none transition focus:border-accent"
            />
          </label>

          <label className="grid gap-2 text-sm tracking-tight text-text/80">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none transition focus:border-accent"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          Subject
          <input
            name="subject"
            type="text"
            required
            className="rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none transition focus:border-accent"
          />
        </label>

        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          Message
          <textarea
            name="message"
            required
            rows={6}
            className="resize-y rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none transition focus:border-accent"
          />
        </label>

        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium tracking-tight text-bg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Send message'}
          </button>

          {message && (
            <p
              className={`text-sm tracking-tight ${status === 'error' ? 'text-red-700' : 'text-text/80'}`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
