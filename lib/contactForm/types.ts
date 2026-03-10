export type Status = 'idle' | 'submitting' | 'success' | 'error';

export interface FormState {
  name: string;
  email: string;
  message: string;
  website: string;
  status: Status;
  feedback: string;
}

export type Action =
  | { type: 'SET_FIELD'; field: keyof Omit<FormState, 'status' | 'feedback'>; value: string }
  | { type: 'SET_STATUS'; status: Status; feedback?: string }
  | { type: 'RESET' }
