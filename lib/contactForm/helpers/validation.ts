import { FormState } from '../types';

export const isContactFormValid = (state: FormState) =>
  state.name.trim() !== '' && state.email.trim() !== '' && state.message.trim() !== '';
