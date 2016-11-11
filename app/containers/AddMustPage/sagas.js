import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { getBrands, sendDrink } from './add';
import {
  ADD_MUST_SUBMIT,
  ADD_MUST_SUCCESS,
  ADD_MUST_FAILURE,
} from './constants';

function* addMustSaga(action) {
  try {
    const payload = yield call(sendDrink, action.payload);
    yield put({ type: ADD_MUST_SUCCESS, payload });
  } catch (err) {
    yield put({ type: ADD_MUST_FAILURE, payload: { _error: err.message } });
  }
}

export function* watchAddMustSaga() {
  yield* takeLatest(ADD_MUST_SUBMIT, addMustSaga);
}

export function* root() {
  yield* watchAddMustSaga();
}


export default [
  root,
];
