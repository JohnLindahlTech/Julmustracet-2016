import { take, call, put, fork, cancel } from 'redux-saga/effects';
import request from '../../utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_PLAYERS } from './constants';
import { playersLoaded, playersLoadingError } from './actions';

export function* getPlayers() {
  const url = 'http://localhost:3000/api/Players';
  const players = yield call(request, url);
  if (!players.error) {
    yield put(playersLoaded(players.data));
  } else {
    yield put(playersLoadingError(players.error));
  }
}

export function* getPlayersWatcher() {
  while (yield take(LOAD_PLAYERS)) {
    yield call(getPlayers);
  }
}

export function* playersData() {
  const watcher = yield fork(getPlayersWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  playersData,
];
