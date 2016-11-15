/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';

import svLocaleData from 'react-intl/locale-data/sv';
import enLocaleData from 'react-intl/locale-data/en';

import svTranslationMessages from './translations/sv.json';
import enTranslationMessages from './translations/en.json';

export const appLocales = [
  'en',
  'sv',
];

addLocaleData(svLocaleData);
addLocaleData(enLocaleData);

const formatTranslationMessages = (messages) => messages.reduce(
    (result, message) => Object.assign(result, { [message.id]: message.message || message.defaultMessage }),
     {}
   );

export const translationMessages = {
  sv: formatTranslationMessages(svTranslationMessages),
  en: formatTranslationMessages(enTranslationMessages),
};
