/*
 * TranslatedAutoComplete Messages
 *
 * This contains all the text for the TranslatedAutoComplete component.
 */

import { defineMessages } from 'react-intl';

export const ERRORS = {
  REQUIRED: 'presence',
  DEFAULT: 'error',
};

export default defineMessages({
  [ERRORS.REQUIRED]: {
    id: 'app.components.TranslatedAutoComplete.presence',
    defaultMessage: 'Required field',
  },
  [ERRORS.DEFAULT]: {
    id: 'app.components.TranslatedAutoComplete.defaultError',
    defaultMessage: 'Error',
  },
});
