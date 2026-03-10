import type { Reducer } from 'react';
import { FormState, Action } from './types';
import { initialFormState } from './state';

export const contactFormReducer: Reducer<FormState, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_STATUS':
      return { ...state, status: action.status, feedback: action.feedback || '' };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
};
