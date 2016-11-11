import { createSelector } from 'reselect';

/**
 * Direct selector to the addMustPage state domain
 */
const selectAddMustPageDomain = () => (state) => state.get('addMustPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AddMustPage
 */

const selectAddMustPage = () => createSelector(
  selectAddMustPageDomain(),
  (substate) => substate.toJS()
);

export default selectAddMustPage;
export {
  selectAddMustPageDomain,
};
