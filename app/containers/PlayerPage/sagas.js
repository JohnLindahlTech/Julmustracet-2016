import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { generatePlayerSearchFilter } from 'utils/filterGenerators';
import request from 'utils/request';
import { LOAD_PLAYER } from './constants';
import { playerLoaded, playerLoadingError } from './actions';

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

export function* playerData() {
  const watcher = yield fork(getPlayerWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  playerData,
];
