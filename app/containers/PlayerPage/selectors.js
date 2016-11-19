import { createSelector } from 'reselect';

/**
 * Direct selector to the playerPage state domain
 */
const selectPlayerPageDomain = () => (state) => state.get('playerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlayerPage
 */

const selectPlayerPage = () => createSelector(
  selectPlayerPageDomain(),
  (substate) => substate.toJS()
);

const selectPlayer = () => createSelector(
  selectPlayerPageDomain(),
  (globalState) => globalState.get('player')
);


const selectLoading = () => createSelector(
  selectPlayerPageDomain(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectPlayerPageDomain(),
  (globalState) => globalState.get('error')
);

export default selectPlayerPage;
export {
  selectPlayerPageDomain,
  selectPlayer,
  selectLoading,
  selectError,
};
