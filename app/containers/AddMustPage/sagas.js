import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { getBrands, getRules, sendDrink } from './add';
import {
  ADD_MUST_SUBMIT,
  ADD_MUST_SUCCESS,
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
    const payload = yield call(transformError, error);
    yield put(mustAddedError(payload));
  }
}

export function* watchAddMustSaga() {
  yield* takeLatest(ADD_MUST_SUBMIT, addMustSaga);
}

export function* watchMustAddedSaga() {
  yield* takeLatest(ADD_MUST_SUCCESS, () => forwardTo('/'));
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
  const watcherMustAdded = yield fork(watchMustAddedSaga);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherAdd);
  yield cancel(watcherBrands);
  yield cancel(watcherRules);
  yield cancel(watcherMustAdded);
}

function objectMap(object, fn) {
  return Object.keys(object).reduce((result, key) => Object.assign(result, { [key]: fn(object[key]) }), {});
}

function transformError(err) {
  if (!err.response) {
    return Promise.resolve({ _error: '500' });
  }
  return err.response.json().then(({ error }) => {
    const fieldErrors = !(error.details && error.details.codes) ? {} : objectMap(error.details.codes, (field) => field[0]);
    const realErros = tweakErrors(fieldErrors);
    return Object.assign({ _error: `${error.statusCode}` }, realErros);
  });
}

function tweakErrors(errors) {
  return Object.keys(errors)
    .reduce((result, field) => {
      switch (field) {
        case 'brandId': return Object.assign(result, { brand: errors[field] });
        case 'date': return Object.assign(result, { time: errors[field] });
        default: return result;
      }
    }, errors);
}

function forwardTo(location) {
  browserHistory.push(location);
}

export default [
  root,
];
