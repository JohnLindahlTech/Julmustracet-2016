import { createSelector } from 'reselect';

/**
 * Direct selector to the brandTopList state domain
 */
const selectBrandTopListDomain = () => (state) => state.get('brandTopList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BrandTopList
 */

const selectBrandTopList = () => createSelector(
  selectBrandTopListDomain(),
  (substate) => substate.toJS()
);

const selectBrands = () => createSelector(
  selectBrandTopListDomain(),
  (globalState) => globalState.get('brands')
);


const selectLoading = () => createSelector(
  selectBrandTopListDomain(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectBrandTopListDomain(),
  (globalState) => globalState.get('error')
);

export default selectBrandTopList;
export {
  selectBrandTopListDomain,
  selectBrands,
  selectLoading,
  selectError,
};
