/*
 *
 * BrandTopList reducer
 *
 */

import {
  LOAD_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  brands: [],
});

function brandTopListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BRANDS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_BRANDS_SUCCESS:
      return state
        .set('brands', action.brands)
        .set('loading', false);
    case LOAD_BRANDS_ERROR:
      return state
        .set('error', action.error)
        .set('brands', [])
        .set('loading', false);
    default:
      return state;
  }
}

export default brandTopListReducer;
