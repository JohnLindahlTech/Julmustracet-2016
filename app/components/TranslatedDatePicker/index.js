/**
*
* TranslatedDatePicker
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import DatePicker from 'material-ui/DatePicker';
import messages, { ERRORS } from './messages';
export { ERRORS } from './messages';

function TranslatedDatePicker({ input, meta: { touched, error }, ...rest }) {
  const errMsg = messages[error] || messages[ERRORS.DEFAULT];
  return (
    <DatePicker
      errorText={touched && error && <FormattedMessage {...errMsg} />}
      {...input}
      {...rest}
      value={input.value !== '' ? new Date(input.value) : null}
      onChange={(event, val) => input.onChange(val)}
    />
  );
}


TranslatedDatePicker.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default TranslatedDatePicker;
