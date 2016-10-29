/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
} from './constants';
import auth from './auth';
import { fromJS } from 'immutable';

// The initial application state
const initialState = fromJS({
  currentlySending: false,
  loggedIn: auth.loggedIn(),
});

// Takes care of changing the application state
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return state
        .set('loggedIn', action.newAuthState);
    case SENDING_REQUEST:
      return state
        .set('currentlySending', action.sending);
    case REQUEST_ERROR:
      return state
        .set('error', action.payload);
    case CLEAR_ERROR:
      return state.delete('error');
    default:
      return state;
  }
}

export default reducer;
