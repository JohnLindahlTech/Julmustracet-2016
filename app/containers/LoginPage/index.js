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
import { Toggle } from 'redux-form-material-ui';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { onSubmitActions } from 'redux-form-submit-saga/immutable';
import { loginRequest } from '../auth/actions';
import Page from 'components/Page';
import { Link } from 'react-router';
import { red900, red200, fullWhite } from 'material-ui/styles/colors';
import TranslatedValidationField from 'components/TranslatedValidationField';


import { SET_AUTH, REQUEST_ERROR } from '../auth/constants';

function renderError(error) {
  const styles = {
    loginError: {
      color: red900,
    },
  };
  const message = messages[error] || messages[500];
  return (<strong style={styles.loginError}><FormattedMessage {...message} /></strong>);
}

class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    showPassword: PropTypes.bool,
    error: PropTypes.string,
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
    const styles = {
      thumbSwitched: {
        backgroundColor: red900,
      },
      trackSwitched: {
        backgroundColor: red200,
      },

    };
    return (
      <Page messages={messages}>
        <form onSubmit={handleSubmit} noValidate>
          {error && renderError(error)}
          <div>
            <Field name="email" component={TranslatedValidationField} type="email" hintText="john.doe@gmail.com" floatingLabelText={formatMessage(messages.email)} />
          </div>
          <div>
            <Field name="password" component={TranslatedValidationField} type={showPassword ? 'text' : 'password'} hintText="**********" floatingLabelText={formatMessage(messages.password)} />
          </div>
          <div>
            <Field
              name="showPassword"
              component={Toggle}
              label={formatMessage(messages.showPassword)}
              labelPosition="right"
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
          </div>
          <div>
            <RaisedButton backgroundColor={red900} type="submit" labelColor={fullWhite} disabled={pristine || submitting} label={<FormattedMessage {...messages.submitForm} />} />
          </div>
          <Link to="/signup"><FormattedMessage {...messages.signup} /></Link>
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
      errors[field] = 'presence';
    }
  });
  if (normalValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(normalValues.email)) {
    errors.email = 'custom.email';
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
