/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import svLocaleData from 'react-intl/locale-data/sv';

export const appLocales = [
  'en',
  'sv',

];

import enTranslationMessages from './translations/en.json';
import svTranslationMessages from './translations/sv.json';

addLocaleData(enLocaleData);
addLocaleData(svLocaleData);

const formatTranslationMessages = (messages) => {
  const formattedMessages = {};
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage;
  }

  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  sv: formatTranslationMessages(svTranslationMessages),
};
