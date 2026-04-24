'use client';

import clsx from 'clsx';
import { useEffect, useReducer, useState } from 'react';
import { Turnstile } from 'react-turnstile';
import { contactFormReducer } from '@/lib/contactForm/reducer';
import { initialFormState } from '@/lib/contactForm/state';
import { isContactFormValid } from '@/lib/contactForm/helpers';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile/client';
import { canTrackGoogleAnalytics, trackAnalyticsEvent } from '@/lib/analytics';
import { ContactFormCopy } from '@/types/contactForm';
import SectionHeader from './sections/SectionHeader';
import SectionShell from './sections/SectionShell';

type ContactFormProps = {
  copy?: ContactFormCopy | null;
};

const defaultContactFormCopy: Required<
  Pick<
    ContactFormCopy,
    | 'eyebrow'
    | 'title'
    | 'nameLabel'
    | 'emailLabel'
    | 'messageLabel'
    | 'submitLabel'
    | 'submittingLabel'
    | 'feedbackSuccess'
    | 'feedbackError'
    | 'feedbackNetworkError'
  >
> = {
  eyebrow: 'Start a conversation',
  title: 'Tell us what you have in mind',
  nameLabel: 'Name',
  emailLabel: 'Email',
  messageLabel: 'Message',
  submitLabel: 'Send message',
  submittingLabel: 'Sending...',
  feedbackSuccess: 'Thanks for reaching out. We will be in touch soon.',
  feedbackError: 'Something went wrong. Please try again.',
  feedbackNetworkError:
    'We could not send your message. Please check your connection and try again.',
};

const textOrDefault = (value: string | null | undefined, fallback: string) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
};

const ContactForm = ({ copy }: ContactFormProps) => {
  const [state, dispatch] = useReducer(contactFormReducer, initialFormState);
  const [submittedAt, setSubmittedAt] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileWidgetKey, setTurnstileWidgetKey] = useState(0);
  const isSubmitting = state.status === 'submitting';
  const isTurnstileEnabled = Boolean(TURNSTILE_SITE_KEY);

  const isFormValid = isContactFormValid(state);
  const eyebrowLabel = textOrDefault(copy?.eyebrow, defaultContactFormCopy.eyebrow);
  const titleLabel = textOrDefault(copy?.title, defaultContactFormCopy.title);
  const introText = copy?.intro;
  const nameLabel = textOrDefault(copy?.nameLabel, defaultContactFormCopy.nameLabel);
  const emailLabel = textOrDefault(copy?.emailLabel, defaultContactFormCopy.emailLabel);
  const messageLabel = textOrDefault(copy?.messageLabel, defaultContactFormCopy.messageLabel);
  const submitLabel = textOrDefault(copy?.submitLabel, defaultContactFormCopy.submitLabel);
  const submittingLabel = textOrDefault(
    copy?.submittingLabel,
    defaultContactFormCopy.submittingLabel,
  );
  const feedbackSuccess = textOrDefault(
    copy?.feedbackSuccess,
    defaultContactFormCopy.feedbackSuccess,
  );
  const feedbackError = textOrDefault(copy?.feedbackError, defaultContactFormCopy.feedbackError);
  const feedbackNetworkError = textOrDefault(
    copy?.feedbackNetworkError,
    defaultContactFormCopy.feedbackNetworkError,
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => setSubmittedAt(Date.now()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!canTrackGoogleAnalytics()) return;

    trackAnalyticsEvent('contact_form_view', {
      form_name: 'contact',
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid || isSubmitting || !submittedAt) return;

    trackAnalyticsEvent('contact_form_submit_attempt', {
      form_name: 'contact',
    });
    dispatch({ type: 'SET_STATUS', status: 'submitting', feedback: '' });

    const payload = {
      name: state.name.trim(),
      email: state.email.trim(),
      message: state.message.trim(),
      website: state.website.trim(),
      submittedAt,
      turnstileToken,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        trackAnalyticsEvent('contact_form_submit_error', {
          form_name: 'contact',
          error_source: 'api',
          status_code: response.status,
        });
        dispatch({
          type: 'SET_STATUS',
          status: 'error',
          feedback: result.error || feedbackError,
        });
        return;
      }

      trackAnalyticsEvent('contact_form_submit_success', {
        form_name: 'contact',
      });

      dispatch({ type: 'RESET' });
      setSubmittedAt(Date.now());
      setTurnstileToken('');
      dispatch({
        type: 'SET_STATUS',
        status: 'success',
        feedback: feedbackSuccess,
      });
    } catch {
      setTurnstileToken('');
      dispatch({
        type: 'SET_STATUS',
        status: 'error',
        feedback: feedbackNetworkError,
      });
      trackAnalyticsEvent('contact_form_submit_error', {
        form_name: 'contact',
        error_source: 'network',
      });
    } finally {
      setTurnstileToken('');
      if (isTurnstileEnabled) {
        setTurnstileWidgetKey((value) => value + 1);
      }
    }
  };

  return (
    <SectionShell>
      <div className="surface-card surface-radius p-5 sm:p-6 md:p-8">
        <header className="pb-6">
          <SectionHeader compact eyebrow={eyebrowLabel} title={titleLabel} intro={introText} />
        </header>
        <form className="grid gap-6" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="form-field">
              {nameLabel}
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                className="input-base"
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })
                }
                disabled={isSubmitting}
              />
            </label>

            <label className="form-field">
              {emailLabel}
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-base"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })
                }
                disabled={isSubmitting}
              />
            </label>
          </div>

          <label className="form-field">
            {messageLabel}
            <textarea
              name="message"
              required
              rows={6}
              className="input-base resize-y"
              value={state.message}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'message', value: e.target.value })
              }
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
            onChange={(e) =>
              dispatch({ type: 'SET_FIELD', field: 'website', value: e.target.value })
            }
            disabled={isSubmitting}
          />

          <input type="hidden" name="submittedAt" value={submittedAt || ''} />

          {isTurnstileEnabled && (
            <Turnstile
              key={turnstileWidgetKey}
              sitekey={TURNSTILE_SITE_KEY}
              responseField={false}
              fixedSize
              refreshExpired="auto"
              theme="light"
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken('')}
              onError={() => setTurnstileToken('')}
            />
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !isFormValid ||
                !submittedAt ||
                (isTurnstileEnabled && !turnstileToken)
              }
              className="btn-primary"
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </button>

            {state.feedback && (
              <p
                className={clsx(
                  'text-fluid-body-sm tracking-tight',
                  state.status === 'error' ? 'text-red-700' : 'text-80',
                )}
              >
                {state.feedback}
              </p>
            )}
          </div>
        </form>
      </div>
    </SectionShell>
  );
};

export default ContactForm;
