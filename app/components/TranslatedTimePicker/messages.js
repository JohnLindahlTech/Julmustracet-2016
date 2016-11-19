/*
 * TranslatedTimePicker Messages
 *
 * This contains all the text for the TranslatedTimePicker component.
 */
import { defineMessages } from 'react-intl';

export const ERRORS = {
  REQUIRED: 'presence',
  TOO_LATE: 'too.late',
  TOO_EARLY: 'too.early',
  DEFAULT: 'error',
  NUMBER: 'numericality.blank',
  EMPTY: 'numericality.null',
  CUSTOM: 'custom',
};

export default defineMessages({
  [ERRORS.REQUIRED]: {
    id: 'app.components.TranslatedTimePicker.presence',
    defaultMessage: 'Required field',
  },
  [ERRORS.TOO_LATE]: {
    id: 'app.components.TranslatedTimePicker.tooLate',
    defaultMessage: 'Too late',
  },
  [ERRORS.TOO_EARLY]: {
    id: 'app.components.TranslatedTimePicker.tooEarly',
    defaultMessage: 'Too early',
  },
  [ERRORS.DEFAULT]: {
    id: 'app.components.TranslatedTimePicker.defaultError',
    defaultMessage: 'Error',
  },
  [ERRORS.EMPTY]: {
    id: 'app.components.TranslatedTimePicker.empty',
    defaultMessage: 'Required Field',
  },
  [ERRORS.NUMBER]: {
    id: 'app.components.TranslatedTimePicker.number',
    defaultMessage: 'Must be a valid number',
  },
});
