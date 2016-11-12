/**
*
* TranslatedTimePicker
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import TimePicker from 'material-ui/TimePicker';
import { ensureTime } from 'utils/time';
import messages, { ERRORS } from './messages';
export { ERRORS } from './messages';

function TranslatedTimePicker({ input, meta: { touched, error }, ...rest }) {
  const time = ensureTime(input.value);
  const errMsg = messages[error] || messages[ERRORS.DEFAULT];
  return (
    <TimePicker
      format="24hr"
      errorText={touched && error && <FormattedMessage {...errMsg} />}
      {...input}
      {...rest}
      value={time}
      onChange={(event, value) => input.onChange(value)}
    />
  );
}

TranslatedTimePicker.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default TranslatedTimePicker;
