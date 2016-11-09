/*
 * TranslatedValidationField Messages
 *
 * This contains all the text for the TranslatedValidationField component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  presence: {
    id: 'app.components.TranslatedValidationField.presence',
    defaultMessage: 'Required field',
  },
  too_short: {
    id: 'app.components.TranslatedValidationField.too_short',
    defaultMessage: 'Too short',
  },
  uniqueness: {
    id: 'app.components.TranslatedValidationField.uniqueness',
    defaultMessage: 'Already taken',
  },
  'custom.email': {
    id: 'app.components.TranslatedValidationField.custom.email',
    defaultMessage: 'Must be a valid email',
  },
  'default.error': {
    id: 'app.components.TranslatedValidationField.default.error',
    defaultMessage: 'Invalid',
  },
});
