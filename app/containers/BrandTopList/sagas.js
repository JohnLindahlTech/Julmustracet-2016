import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from '../../utils/request';
import { LOAD_BRANDS } from './constants';
import { brandsLoaded, brandsLoadingError } from './actions';

const url = 'http://localhost:3000/api/Brands?filter[where][total][gt]=0';

export function* getBrands() {
  const brands = yield call(request, url);
  if (!brands.error) {
    yield put(brandsLoaded(brands.data));
  } else {
    yield put(brandsLoadingError(brands.error));
  }
}

export function* getBrandsWatcher() {
  while (yield take(LOAD_BRANDS)) {
    yield call(getBrands);
  }
}

export function* brandsData() {
  const watcher = yield fork(getBrandsWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  brandsData,
];
