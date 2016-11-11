/*
 *
 * AddMustPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TextField, AutoComplete } from 'redux-form-material-ui';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { onSubmitActions } from 'redux-form-submit-saga/immutable';
import { ADD_MUST } from './constants';
import messages from './messages';
import selectAddMustPage from './selectors';
import styles from './styles.css';
import Page from '../../components/Page';


import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['sv', 'sv-SE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/sv');
  require('intl/locale-data/jsonp/sv-SE');
}

export class AddMustPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
    brands: PropTypes.array,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    defaultDate: PropTypes.object,
  };

  static defaultProps = {
    brands: [], // TODO Load actual data to brands, min date and max date.
    minDate: new Date('2016-11-01'),
    maxDate: new Date('2016-12-20'),
    defaultDate: new Date(),
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      brands,
      minDate,
      maxDate,
      defaultDate,
    } = this.props;
    return (
      <Page messages={messages}>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <Field
              name="brand"
              maxSearchResults={6}
              filter={AutoComplete.fuzzyFilter}
              dataSource={brands.map((brand) => (brand.name))}
              component={AutoComplete}
              hintText="Apotekarnes"
              floatingLabelText={<FormattedMessage {...messages.brand} />}
            />
          </div>
          <div>
            <Field
              name="amount"
              component={TextField}
              step={0.1}
              type="number"
              hintText="0.33"
              floatingLabelText={<FormattedMessage {...messages.amount} />}
            />
          </div>
          <div>
            <Field
              name="date"
              disableYearSelection
              component={renderDatePicker}
              hintText="Data"
              autoOk
              floatingLabelText={<FormattedMessage {...messages.date} />}
              DateTimeFormat={DateTimeFormat}
              locale="sv-SE"
              okLabel={<FormattedMessage {...messages.ok} />}
              cancelLabel={<FormattedMessage {...messages.cancel} />}
              minDate={minDate}
              maxDate={maxDate}
              defaultDate={defaultDate}
            />
          </div>
          <div>
            <Field
              name="time"
              component={renderTimePicker}
              hintText="Data"
              autoOk
              floatingLabelText={<FormattedMessage {...messages.time} />}
              okLabel={<FormattedMessage {...messages.ok} />}
              cancelLabel={<FormattedMessage {...messages.cancel} />}
              defaultTime={defaultDate}
            />
          </div>
          <div>
            <FlatButton
              label={<FormattedMessage {...messages.resetForm} />}
              secondary
              onTouchTap={reset}
            />
            <RaisedButton type="submit" primary disabled={pristine || submitting} label={<FormattedMessage {...messages.submitForm} />} />
          </div>
        </form>
      </Page>
    );
  }
}

const renderTimePicker = ({ input, meta: { touched, error }, ...rest }) => (
  <TimePicker
    format="24hr"
    errorText={touched && error}
    {...input}
    {...rest}
    value={input.value !== '' ? input.value : null}
    onChange={(event, value) => input.onChange(value)}
  />
);

renderTimePicker.PropTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

const renderDatePicker = ({ input, meta: { touched, error }, ...rest }) => (
  <DatePicker
    errorText={touched && error}
    {...input}
    {...rest}
    value={input.value !== '' ? new Date(input.value) : null}
    onChange={(event, value) => input.onChange(value)}
  />
);

renderDatePicker.PropTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

function validate(values) {
  const normalValues = values.toJS();
  const errors = {};
  const requiredFields = ['brand', 'amount', 'date', 'time'];
  requiredFields.forEach((field) => {
    if (!normalValues[field]) {
      errors[field] = 'required';
    }
  });
  return errors;
}

const mapStateToProps = selectAddMustPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const connectedAddMustPage = connect(mapStateToProps, mapDispatchToProps)(AddMustPage);

const AddMustFormPage = reduxForm({
  form: 'add',
  validate,
  onSubmit: onSubmitActions(ADD_MUST),
})(connectedAddMustPage);

export default AddMustFormPage;
