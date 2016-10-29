/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.LoginPage.header',
    defaultMessage: 'Login',
  },
  signup: {
    id: 'app.components.LoginPage.signup',
    defaultMessage: 'Sign up',
  },
  title: {
    id: 'app.components.LoginPage.title',
    defaultMessage: 'JulmustRacet Login',
  },
  description: {
    id: 'app.components.LoginPage.description',
    defaultMessage: 'Login to be able to add more Must on JulmustRacet.',
  },
  submitForm: {
    id: 'app.components.LoginPage.submitForm',
    defaultMessage: 'Log in',
  },
  email: {
    id: 'app.components.LoginPage.email',
    defaultMessage: 'Email',
  },
  password: {
    id: 'app.components.LoginPage.password',
    defaultMessage: 'Password',
  },
  showPassword: {
    id: 'app.components.LoginPage.showPassword',
    defaultMessage: 'Show Password',
  },
  401: {
    id: 'app.components.LoginPage.401',
    defaultMessage: 'Invalid credentials',
  },
  500: {
    id: 'app.components.LoginPage.500',
    defaultMessage: 'Something went wrong.',
  },
});
