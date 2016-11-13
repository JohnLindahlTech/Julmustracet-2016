/*
 * TranslatedAutoComplete Messages
 *
 * This contains all the text for the TranslatedAutoComplete component.
 */

import { defineMessages } from 'react-intl';

export const ERRORS = {
  REQUIRED: 'presence',
  LENGTH_MAX: 'length.max',
  DEFAULT: 'error',
};

export default defineMessages({
  [ERRORS.REQUIRED]: {
    id: 'app.components.TranslatedAutoComplete.presence',
    defaultMessage: 'Required field',
  },
  [ERRORS.LENGTH_MAX]: {
    id: 'app.components.TranslatedAutoComplete.length.max',
    defaultMessage: 'Too long',
  },
  [ERRORS.DEFAULT]: {
    id: 'app.components.TranslatedAutoComplete.defaultError',
    defaultMessage: 'Error',
  },
});
