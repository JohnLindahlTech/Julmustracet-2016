// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import { browserHistory } from 'react-router';
import { take, call, put, fork, race } from 'redux-saga/effects';
import auth from './auth';

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT,
  REQUEST_ERROR,
} from './constants';


/**
 * Effect to handle authorization
 * @param  {string} email               The email of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorize({ email, password, username, isRegistering }) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
    let response;

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, email, password, username);
    } else {
      response = yield call(auth.login, email, password, username);
    }

    return response;
  } catch (error) {
    const payload = yield call(transformError, error);
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, payload });

    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

function transformError(err) {
  if (!err.response) {
    return Promise.resolve({ _error: '500' });
  }
  return err.response.json().then(({ error }) => {
    const fieldErrors = !(error.details && error.details.codes) ? {} : objectMap(error.details.codes, (field) => field[0]);
    return Object.assign({ _error: `${error.statusCode}` }, fieldErrors);
  });
}

function objectMap(object, fn) {
  return Object.keys(object).reduce((result, key) => Object.assign(result, { [key]: fn(object[key]) }), {});
}

/**
 * Effect to handle logging out
 */
export function* logout() {
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    const response = yield call(auth.logout);
    yield put({ type: SENDING_REQUEST, sending: false });

    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(LOGIN_REQUEST);

    const email = request.data.get('email');
    const password = request.data.get('password');
    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(authorize, { email, password, isRegistering: false }),
      logout: take(LOGOUT),
    });

    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
      forwardTo('/add'); // Go to add page
      // If `logout` won...
    } else if (winner.logout) {
      // ...we send Redux appropiate action
      yield put({ type: SET_AUTH, newAuthState: false }); // User is not logged in (not authorized)
      yield call(logout); // Call `logout` effect
      forwardTo('/'); // Go to root page
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT);
    yield put({ type: SET_AUTH, newAuthState: false });

    yield call(logout);
    forwardTo('/');
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow() {
  while (true) {
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(REGISTER_REQUEST);
    const email = request.data.get('email');
    const password = request.data.get('password');
    const username = request.data.get('username');

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    const wasSuccessful = yield call(authorize, { email, password, username, isRegistering: true });

    // If we could register a user, we send the appropiate actions
    if (wasSuccessful) {
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered
      forwardTo('/add'); // Go to add page
    }
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export function* root() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(registerFlow);
}

export default [
  root,
];


// Little helper function to abstract going to different pages
function forwardTo(location) {
  browserHistory.push(location);
}
