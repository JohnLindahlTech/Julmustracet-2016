import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getBrands, getRules, sendDrink } from './add';
import {
  ADD_MUST_SUBMIT,
  GET_RULES,
  GET_BRANDS,
} from './constants';

import {
  mustAdded,
  mustAddedError,
  rulesLoaded,
  rulesLoadingError,
  brandsLoaded,
  brandsLoadingError,
} from './actions';

function* addMustSaga(action) {
  try {
    const payload = yield call(sendDrink, action.payload);
    yield put(mustAdded(payload));
  } catch (error) {
    yield put(mustAddedError(error));
  }
}

export function* watchAddMustSaga() {
  yield* takeLatest(ADD_MUST_SUBMIT, addMustSaga);
}

function* getRulesSaga() {
  try {
    const payload = yield call(getRules);
    yield put(rulesLoaded(payload));
  } catch (error) {
    yield* put(rulesLoadingError(error));
  }
}

export function* watchGetRulesSaga() {
  yield* takeLatest(GET_RULES, getRulesSaga);
}

function* getBrandsSaga() {
  try {
    const payload = yield call(getBrands);
    yield put(brandsLoaded(payload));
  } catch (error) {
    yield* put(brandsLoadingError(error));
  }
}

export function* watchGetBrandsSaga() {
  yield* takeLatest(GET_BRANDS, getBrandsSaga);
}


export function* root() {
  const watcherAdd = yield fork(watchAddMustSaga);
  const watcherBrands = yield fork(watchGetBrandsSaga);
  const watcherRules = yield fork(watchGetRulesSaga);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherAdd);
  yield cancel(watcherBrands);
  yield cancel(watcherRules);
}


export default [
  root,
];
