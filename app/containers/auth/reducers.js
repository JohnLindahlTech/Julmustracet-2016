/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
} from './constants';
import auth from './auth';
import { fromJS } from 'immutable';

// The initial application state
const initialState = fromJS({
  formState: {
    username: '',
    password: '',
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
});

// Takes care of changing the application state
function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return state
        .set('formState', action.newFormState);
    case SET_AUTH:
      return state
        .set('loggedIn', action.newAuthState);
    case SENDING_REQUEST:
      return state
        .set('currentlySending', action.sending);
    case REQUEST_ERROR:
      return state
        .set('error', action.error);
    case CLEAR_ERROR:
      return state.set('error', '');
    default:
      return state;
  }
}

export default reducer;
