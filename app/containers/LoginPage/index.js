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

import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Toggle } from 'redux-form-material-ui';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { onSubmitActions } from 'redux-form-submit-saga/immutable';
import { loginRequest } from 'containers/auth/actions';
import Page from 'components/Page';
import { Link } from 'react-router';
import { Row, Col } from 'react-bem-grid';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { red900 } from 'material-ui/styles/colors';
import TranslatedValidationField, { ERRORS } from 'components/TranslatedValidationField';
import messages from './messages';


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
    return (
      <Page messages={messages}>
        <Row xsCenter>
          <Col md={6} >
            <Card>
              <CardTitle title={<FormattedMessage {...messages.header} />} subtitle={<span><Link to="/signup"><FormattedMessage {...messages.signup} /></Link></span>} />
              <CardText>
                <form onSubmit={handleSubmit} noValidate autoComplete={'off'}>
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
                    />
                  </div>
                  <div>
                    <RaisedButton primary type="submit" disabled={pristine || submitting} label={<FormattedMessage {...messages.submitForm} />} />
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
  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!normalValues[field]) {
      errors[field] = ERRORS.REQUIRED;
    }
  });
  if (normalValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(normalValues.email)) {
    errors.email = ERRORS.EMAIL;
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
