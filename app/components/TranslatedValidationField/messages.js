/*
 * TranslatedValidationField Messages
 *
 * This contains all the text for the TranslatedValidationField component.
 */
import { defineMessages } from 'react-intl';
export const ERRORS = {
  REQUIRED: 'presence',
  LENGTH_SHORT: 'length.min',
  LENGTH_LONG: 'length.max',
  UNIQUE: 'uniqueness',
  EMAIL: 'custom.email',
  DEFAULT: 'error',
  TOO_MUCH: 'too.much',
  TOO_LITTLE: 'too.little',
};

export default defineMessages({
  [ERRORS.REQUIRED]: {
    id: 'app.components.TranslatedValidationField.presence',
    defaultMessage: 'Required field',
  },
  [ERRORS.LENGTH_SHORT]: {
    id: 'app.components.TranslatedValidationField.too_short',
    defaultMessage: 'Too short',
  },
  [ERRORS.LENGTH_LONG]: {
    id: 'app.components.TranslatedValidationField.too_long',
    defaultMessage: 'Too long',
  },
  [ERRORS.UNIQUE]: {
    id: 'app.components.TranslatedValidationField.uniqueness',
    defaultMessage: 'Already taken',
  },
  [ERRORS.EMAIL]: {
    id: 'app.components.TranslatedValidationField.custom.email',
    defaultMessage: 'Must be a valid email',
  },
  [ERRORS.DEFAULT]: {
    id: 'app.components.TranslatedValidationField.default.error',
    defaultMessage: 'Invalid',
  },
  [ERRORS.TOO_MUCH]: {
    id: 'app.components.TranslatedValidationFieldtoo.much',
    defaultMessage: 'Too much',
  },
  [ERRORS.TOO_LITTLE]: {
    id: 'app.components.TranslatedValidationField.too.little',
    defaultMessage: 'Too little',
  },
});
