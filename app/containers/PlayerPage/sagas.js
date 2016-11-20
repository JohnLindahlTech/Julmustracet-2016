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
  try {
    const player = yield call(request, `${baseUrl}?filter=${generatePlayerSearchFilter(username)}`);
    yield put(playerLoaded(player.data[0]));
  } catch (error) {
    yield put(playerLoadingError(error));
  }
}

export function* getPlayerWatcher() {
  while (true) {
    const action = yield take(LOAD_PLAYER);
    yield call(getPlayer, action.username);
  }
}

export function* deleteDrink(drinkId) {
  try {
    yield call(del, `/api/Drinks/${drinkId}`);
    yield put(drinkDeleted(drinkId));
  } catch (error) {
    yield put(drinnkDeletedError(error));
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
