import type { PortableTextBlock } from './sections';

export interface ContactFormCopy {
  eyebrow?: string;
  title?: string;
  intro?: string | PortableTextBlock[];
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  feedbackSuccess?: string;
  feedbackError?: string;
  feedbackNetworkError?: string;
}
