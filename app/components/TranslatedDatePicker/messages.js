/*
 * TranslatedDatePicker Messages
 *
 * This contains all the text for the TranslatedDatePicker component.
 */
import { defineMessages } from 'react-intl';

export const ERRORS = {
  REQUIRED: 'presence',
  TOO_LATE: 'too.late',
  TOO_EARLY: 'too.early',
  DEFAULT: 'error',
};

export default defineMessages({
  [ERRORS.REQUIRED]: {
    id: 'app.components.TranslatedDatePicker.presence',
    defaultMessage: 'Required field',
  },
  [ERRORS.TOO_LATE]: {
    id: 'app.components.TranslatedDatePicker.tooLate',
    defaultMessage: 'Too late',
  },
  [ERRORS.TOO_EARLY]: {
    id: 'app.components.TranslatedDatePicker.tooEarly',
    defaultMessage: 'Too early',
  },
  [ERRORS.DEFAULT]: {
    id: 'app.components.TranslatedDatePicker.defaultError',
    defaultMessage: 'Error',
  },
});
