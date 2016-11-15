/*
 * SignupPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';

import Page from 'components/Page';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { onSubmitActions } from 'redux-form-submit-saga/immutable';
import { Toggle } from 'redux-form-material-ui';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { red900 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-bem-grid';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TranslatedValidationField, { ERRORS } from 'components/TranslatedValidationField';
import { registerRequest } from '../auth/actions';
import { SET_AUTH, REQUEST_ERROR } from '../auth/constants';
import messages from './messages';


function renderError(error) {
  const styles = {
    loginError: {
      color: red900,
    },
  };
  const message = messages[error] || messages[500];
  return (<strong style={styles.loginError}><FormattedMessage {...message} /></strong>);
}

class SignupPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    showPassword: PropTypes.bool,
    reset: PropTypes.func,
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
      reset,
      submitting,
      showPassword,
      error,
    } = this.props;
    return (
      <Page messages={messages}>
        <Row xsCenter>
          <Col md={6} >
            <Card>
              <CardTitle title={<FormattedMessage {...messages.header} />} />
              <CardText>
                <form onSubmit={handleSubmit} noValidate>
                  {error && renderError(error)}
                  <div>
                    <Field name="username" component={TranslatedValidationField} type="text" hintText="1337-h4xXx0r" floatingLabelText={formatMessage(messages.username)} />
                  </div>
                  <div>
                    <Field name="email" component={TranslatedValidationField} type="email" hintText="john.doe@gmail.com" floatingLabelText={formatMessage(messages.email)} />
                  </div>
                  <div>
                    <Field name="password" component={TranslatedValidationField} type={showPassword ? 'text' : 'password'} hintText="**********" floatingLabelText={formatMessage(messages.password)} />
                  </div>
                  <div>
                    <Field name="showPassword" component={Toggle} label={formatMessage(messages.showPassword)} labelPosition="right" />
                  </div>
                  <div>
                    <FlatButton
                      label={formatMessage(messages.resetForm)}
                      secondary
                      onTouchTap={reset}
                    />
                    <RaisedButton type="submit" primary disabled={pristine || submitting} label={formatMessage(messages.submitForm)} />
                  </div>
                </form>
              </CardText>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

function validate(values) {
  const normalValues = values.toJS();
  const errors = {};
  const requiredFields = ['username', 'email', 'password'];
  requiredFields.forEach((field) => {
    if (!normalValues[field]) {
      errors[field] = ERRORS.REQUIRED;
    }
  });
  if (normalValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(normalValues.email)) {
    errors.email = ERRORS.EMAIL;
  }
  if (normalValues.password && normalValues.password.length < 6) {
    errors.password = ERRORS.TOO_SHORT;
  }
  return errors;
}

const TranslatedSignupPage = injectIntl(SignupPage);

const SignupFormPage = reduxForm({
  form: 'registerUser',
  validate,
  onSubmit: onSubmitActions(registerRequest, SET_AUTH, REQUEST_ERROR),
})(TranslatedSignupPage);

const selector = formValueSelector('registerUser');
const SelectedSignupFormPage = connect(
  (state) => {
    const showPassword = selector(state, 'showPassword');
    return { showPassword };
  }
)(SignupFormPage);

export default SelectedSignupFormPage;
