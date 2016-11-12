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
import { AutoComplete } from 'redux-form-material-ui';
import { onSubmitActions } from 'redux-form-submit-saga/immutable';
import { fromJS } from 'immutable';
import Page from 'components/Page';
import TranslatedAutoComplete from 'components/TranslatedAutoComplete';
import TranslatedDatePicker, { ERRORS as DATE_ERRORS } from 'components/TranslatedDatePicker';
import TranslatedTimePicker from 'components/TranslatedTimePicker';
import TranslatedValidationField, { ERRORS as TEXT_ERRORS } from 'components/TranslatedValidationField';
import { red900 } from 'material-ui/styles/colors';
import { getEarliestDate, ensureTime, combineDateTime } from 'utils/time';

import areIntlLocalesSupported from 'intl-locales-supported';

import { ADD_MUST } from './constants';
import { loadBrands, loadRules } from './actions';
import messages from './messages';
import selectAddMustPage from './selectors';


let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['sv', 'sv-SE'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl'); // eslint-disable-line global-require
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/sv'); // eslint-disable-line global-require
  require('intl/locale-data/jsonp/sv-SE'); // eslint-disable-line global-require
}

function renderError(error) {
  const styles = {
    loginError: {
      color: red900,
    },
  };
  const message = messages[error] || messages[500];
  return (<strong style={styles.loginError}><FormattedMessage {...message} /></strong>);
}


export class AddMustPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
    brands: PropTypes.array,
    rules: PropTypes.shape({
      startDate: PropTypes.object,
      endDate: PropTypes.object,
    }),
    error: PropTypes.string,
    defaultDate: PropTypes.object,
    getRules: PropTypes.func.isRequired,
    getBrands: PropTypes.func.isRequired,
  };

  static defaultProps = {
    brands: [],
    rules: {
      startDate: new Date('2016-11-01'),
      endDate: new Date('2016-12-20'),
    },
    defaultDate: new Date(),
  }

  componentDidMount() {
    this.props.getRules();
    this.props.getBrands();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      brands,
      rules: {
        startDate,
        endDate,
        minAmount,
        maxAmount,
      },
      error,
      defaultDate,
    } = this.props;
    const maxDate = getEarliestDate(new Date(), endDate);
    return (
      <Page messages={messages}>
        <form onSubmit={handleSubmit} noValidate>
          {error && renderError(error)}
          <div>
            <Field
              name="brand"
              maxSearchResults={6}
              filter={AutoComplete.fuzzyFilter}
              dataSource={brands.map((brand) => (brand.name))}
              component={TranslatedAutoComplete}
              hintText="Apotekarnes"
              floatingLabelText={<FormattedMessage {...messages.brand} />}
            />
          </div>
          <div>
            <Field
              name="amount"
              component={TranslatedValidationField}
              step={0.1}
              min={minAmount}
              max={maxAmount}
              type="number"
              hintText="0.33"
              floatingLabelText={<FormattedMessage {...messages.amount} />}
            />
          </div>
          <div>
            <Field
              name="date"
              disableYearSelection
              component={TranslatedDatePicker}
              hintText="Data"
              autoOk
              floatingLabelText={<FormattedMessage {...messages.date} />}
              DateTimeFormat={DateTimeFormat}
              locale="sv-SE"
              okLabel={<FormattedMessage {...messages.ok} />}
              cancelLabel={<FormattedMessage {...messages.cancel} />}
              minDate={startDate}
              maxDate={maxDate}
              defaultDate={defaultDate}
            />
          </div>
          <div>
            <Field
              name="time"
              component={TranslatedTimePicker}
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

function validate(values, props) {
  const { rules } = props;
  const normalValues = values.toJS();
  const errors = {};
  const requiredFields = ['brand', 'amount', 'date', 'time'];
  requiredFields.forEach((field) => {
    if (!normalValues[field]) {
      errors[field] = TEXT_ERRORS.REQUIRED;
    }
  });
  if (Object.keys(rules).length) {
    if (normalValues.amount > rules.maxAmount) {
      errors.amount = TEXT_ERRORS.TOO_MUCH;
    }

    if (normalValues.amount < rules.minAmount) {
      errors.amount = TEXT_ERRORS.TOO_LITTLE;
    }
    const dateError = validateDate(normalValues.date, normalValues.time, rules);
    if (dateError) {
      errors.date = dateError;
      errors.time = dateError;
    }
  }

  return errors;
}

const validateDate = (date, time, rules) => {
  const dateClone = new Date(date);
  const newTime = ensureTime(time);
  const newDate = combineDateTime(dateClone, newTime);

  const maxDate = getEarliestDate(new Date(), rules.endDate);
  if (newDate.getTime() > maxDate.getTime()) {
    return DATE_ERRORS.TOO_LATE;
  }
  if (newDate.getTime() < rules.startDate.getTime()) {
    return DATE_ERRORS.TOO_EARLY;
  }
  return undefined;
};

const mapStateToProps = selectAddMustPage();

function mapDispatchToProps(dispatch) {
  return {
    getBrands: () => dispatch(loadBrands()),
    getRules: () => dispatch(loadRules()),
    dispatch,
  };
}

const AddMustFormPage = reduxForm({
  form: 'add',
  validate,
  onSubmit: onSubmitActions(ADD_MUST),
  initialValues: fromJS({
    date: new Date(),
    time: new Date(),
  }),
})(AddMustPage);

const connectedAddMustPage = connect(mapStateToProps, mapDispatchToProps)(AddMustFormPage);


export default connectedAddMustPage;
