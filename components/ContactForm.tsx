'use client';

import { useReducer } from 'react';
import { contactFormReducer } from '@/lib/contactForm/reducer';
import { initialFormState } from '@/lib/contactForm/state';
import { isContactFormValid } from '@/lib/contactForm/helpers';

const ContactForm = () => {
  const [state, dispatch] = useReducer(contactFormReducer, initialFormState);
  const isSubmitting = state.status === 'submitting';

  const isFormValid = isContactFormValid(state);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid || isSubmitting) return;

    dispatch({ type: 'SET_STATUS', status: 'submitting', feedback: '' });

    const payload = {
      name: state.name.trim(),
      email: state.email.trim(),
      message: state.message.trim(),
      website: state.website.trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        dispatch({
          type: 'SET_STATUS',
          status: 'error',
          feedback: result.error || 'Something went wrong. Please try again.',
        });
        return;
      }

      dispatch({ type: 'RESET' });
      dispatch({
        type: 'SET_STATUS',
        status: 'success',
        feedback: 'Thanks, your message has been sent.',
      });
    } catch {
      dispatch({
        type: 'SET_STATUS',
        status: 'error',
        feedback: 'Network error. Please try again.',
      });
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          Name
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="input-base"
            value={state.name}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
            disabled={isSubmitting}
          />
        </label>

        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input-base"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="input-base resize-y"
          value={state.message}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'message', value: e.target.value })}
          disabled={isSubmitting}
        />
      </label>

      {/* Honeypot */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={state.website}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'website', value: e.target.value })}
        disabled={isSubmitting}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>

        {state.feedback && (
          <p
            className={`text-sm tracking-tight ${
              state.status === 'error' ? 'text-red-700' : 'text-text/80'
            }`}
          >
            {state.feedback}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
