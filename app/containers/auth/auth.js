import { post } from '../../utils/request';

const LOGIN_URL = 'http://localhost:3000/api/Players/login';
const LOGOUT_URL = 'http://localhost:3000/api/Players/logout';
const REGISTER_URL = 'http://localhost:3000/api/Players';

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

const auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login(username, password) {
    if (auth.loggedIn()) return Promise.resolve(true);

    // Post a fake request
    return post(LOGIN_URL, { username, password })
      .then((response) => {
        // Save token to local storage
        localStorage.token = response.data.id;
        return Promise.resolve(true);
      });
  },
  /**
  * Logs the current user out
  */
  logout() {
    return post(LOGOUT_URL);
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register(username, password) {
    // Post a fake request
    return post(REGISTER_URL, { username, password })
      // Log user in after registering
      .then(() => auth.login(username, password));
  },
  onChange() {},
  getToken() {
    return localStorage.token;
  },
};

export default auth;
