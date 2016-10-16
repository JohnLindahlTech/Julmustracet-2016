import { createSelector } from 'reselect';

/**
 * Direct selector to the playerTopList state domain
 */
const selectPlayerTopListDomain = () => (state) => state.get('playerTopList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlayerTopList
 */

const selectPlayerTopList = () => createSelector(
  selectPlayerTopListDomain(),
  (substate) => substate.toJS()
);

const selectPlayers = () => createSelector(
  selectPlayerTopListDomain(),
  (globalState) => globalState.get('players')
);


const selectLoading = () => createSelector(
  selectPlayerTopListDomain(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectPlayerTopListDomain(),
  (globalState) => globalState.get('error')
);

export default selectPlayerTopList;
export {
  selectPlayerTopListDomain,
  selectPlayers,
  selectLoading,
  selectError,
};
