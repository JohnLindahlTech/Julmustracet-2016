/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import messages from './messages';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { TextField, Toggle } from 'redux-form-material-ui';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { onSubmitActions } from 'redux-form-submit-saga/immutable';
import { loginRequest } from '../auth/actions';
import Page from '../../components/Page';

import styles from './styles.css';

import { SET_AUTH, REQUEST_ERROR } from '../auth/constants';

function renderError(error) {
  const {
    response: {
      status,
    },
  } = error;
  const message = messages[status] || messages[500];
  return (<strong className={styles['login-error']}><FormattedMessage {...message} /></strong>);
}

class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    showPassword: PropTypes.bool,
    error: PropTypes.object,
  };

  static defaultProps = {

  }

  render() {
    const {
      intl: {
        formatMessage,
      },
      handleSubmit,
      pristine,
      submitting,
      showPassword,
      error,
    } = this.props;
    return (
      <Page messages={messages}>
        <form onSubmit={handleSubmit} noValidate>
          {error && renderError(error)}
          <div>
            <Field name="email" component={TextField} type="email" hintText="john.doe@gmail.com" floatingLabelText={formatMessage(messages.email)} />
          </div>
          <div>
            <Field name="password" component={TextField} type={showPassword ? 'text' : 'password'} hintText="**********" floatingLabelText={formatMessage(messages.password)} />
          </div>
          <div>
            <Field name="showPassword" component={Toggle} label={formatMessage(messages.showPassword)} labelPosition="right" />
          </div>
          <div>
            <RaisedButton type="submit" primary disabled={pristine || submitting} label={formatMessage(messages.submitForm)} />
          </div>
        </form>
      </Page>
    );
  }
}

function validate(values) {
  const normalValues = values.toJS();
  const errors = {};
  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!normalValues[field]) {
      errors[field] = 'Required';
    }
  });
  if (normalValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(normalValues.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const TranslatedLoginPage = injectIntl(LoginPage);

const LoginReduxForm = reduxForm({
  form: 'login',
  validate,
  onSubmit: onSubmitActions(loginRequest, SET_AUTH, REQUEST_ERROR),
})(TranslatedLoginPage);

const selector = formValueSelector('login');
const SelectedLoginPage = connect(
  (state) => {
    const showPassword = selector(state, 'showPassword');
    return { showPassword };
  },
)(LoginReduxForm);

export default SelectedLoginPage;
