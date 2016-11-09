/*
 * SignupPage Messages
 *
 * This contains all the text for the SignupPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.SignupPage.header',
    defaultMessage: 'Signup',
  },
  title: {
    id: 'app.components.SignupPage.title',
    defaultMessage: 'JulmustRacet Signup',
  },
  description: {
    id: 'app.components.SignupPage.description',
    defaultMessage: 'Signup for JulmustRacet.',
  },
  firstName: {
    id: 'app.components.SignupPage.firstName',
    defaultMessage: 'First Name',
  },
  lastName: {
    id: 'app.components.SignupPage.lastName',
    defaultMessage: 'Last Name',
  },
  username: {
    id: 'app.components.SignupPage.username',
    defaultMessage: 'Username',
  },
  email: {
    id: 'app.components.SignupPage.email',
    defaultMessage: 'Email',
  },
  password: {
    id: 'app.components.SignupPage.password',
    defaultMessage: 'Password',
  },
  showPassword: {
    id: 'app.components.SignupPage.showPassword',
    defaultMessage: 'Show password',
  },
  resetForm: {
    id: 'app.components.SignupPage.resetForm',
    defaultMessage: 'Reset',
  },
  submitForm: {
    id: 'app.components.SignupPage.submitForm',
    defaultMessage: 'Submit',
  },
  422: {
    id: 'app.components.SignupPage.422',
    defaultMessage: 'Invalid form',
  },
  500: {
    id: 'app.components.LoginPage.500',
    defaultMessage: 'Something went wrong.',
  },
});
