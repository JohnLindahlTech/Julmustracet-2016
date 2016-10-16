import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectPlayers = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('players')
);

const selectBrands = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('brands')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

export {
  selectLocationState,
  selectPlayers,
  selectBrands,
  selectLoading,
  selectError,
};
