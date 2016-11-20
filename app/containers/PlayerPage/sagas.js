import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { generatePlayerSearchFilter } from 'utils/filterGenerators';
import request, { del } from 'utils/request';
import { LOAD_PLAYER, DELETE_DRINK } from './constants';
import {
  playerLoaded,
  playerLoadingError,
  drinkDeleted,
  drinnkDeletedError,
} from './actions';

const baseUrl = '/api/Players';

export function* getPlayer(username) {
  const player = yield call(request, `${baseUrl}?filter=${generatePlayerSearchFilter(username)}`);
  if (!player.error) {
    yield put(playerLoaded(player.data[0]));
  } else {
    yield put(playerLoadingError(player.error));
  }
}

export function* getPlayerWatcher() {
  while (true) {
    const action = yield take(LOAD_PLAYER);
    yield call(getPlayer, action.username);
  }
}

export function* deleteDrink(drinkId) {
  const deleteResult = yield call(del, `/api/Drinks/${drinkId}`);
  if (!deleteResult.error) {
    yield put(drinkDeleted(drinkId));
  } else {
    yield put(drinnkDeletedError(deleteResult.error));
  }
}

export function* deleteDrinkWatcher() {
  while (true) {
    const action = yield take(DELETE_DRINK);
    yield call(deleteDrink, action.drinkId);
  }
}


export function* playerData() {
  const watcher = yield fork(getPlayerWatcher);
  const deleteWatcher = yield fork(deleteDrinkWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(deleteWatcher);
}

export default [
  playerData,

];
