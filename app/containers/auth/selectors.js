import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectAuthDomain = () => (state) => state.get('auth');

/**
 * Other specific selectors
 */


/**
 * Default selector used by login
 */

const selectAuth = () => createSelector(
  selectAuthDomain(),
  (substate) => substate.toJS()
);

const selectLoading = () => createSelector(
  selectAuthDomain(),
  (globalState) => globalState.get('currentlySending')
);

const selectError = () => createSelector(
  selectAuthDomain(),
  (globalState) => globalState.get('error')
);

const selectLoggedIn = () => createSelector(
  selectAuthDomain(),
  (globalState) => globalState.get('loggedIn')
);

export default selectAuth;
export {
  selectAuthDomain,
  selectAuth,
  selectLoading,
  selectError,
  selectLoggedIn,
};
