/*
 * AddPage
 *
 */

import React, { PropTypes } from 'react';
import messages from './messages';
import Page from '../../components/Page';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

class AddPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  static defaultProps = {

  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
    } = this.props;
    return (
      <Page messages={messages}>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <Field name="data" component={TextField} type="text" hintText="Data" floatingLabelText="Data" />
          </div>
          <div>
            <RaisedButton type="submit" disabled={pristine || submitting} label="Submit" />
          </div>
        </form>
      </Page>
    );
  }
}

function validate(values) {
  const normalValues = values.toJS();
  const errors = {};
  const requiredFields = ['data'];
  requiredFields.forEach((field) => {
    if (!normalValues[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}

const AddFormPage = reduxForm({
  form: 'add',
  validate,
})(AddPage);

export default AddFormPage;
