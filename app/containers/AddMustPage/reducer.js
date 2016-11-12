/*
 *
 * AddMustPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_MUST_SUBMIT,
  ADD_MUST_SUCCESS,
  ADD_MUST_FAILURE,
  GET_RULES,
  GET_RULES_SUCCESS,
  GET_RULES_FAILURE,
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAILURE,
} from './constants';

const initialState = fromJS({
  posting: false,
  loadingRules: false,
  loadingBrands: false,
  errorAdd: false,
  errorRules: false,
  errorBrands: false,
  brands: [],
  rules: {},
  must: false,
});

function addMustPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MUST_SUBMIT:
      return state
        .set('posting', true);
    case ADD_MUST_SUCCESS:
      return state
        .set('posting', false)
        .set('must', action.payload);
    case ADD_MUST_FAILURE:
      return state
        .set('posting', true)
        .set('errorAdd', action.error);
    case GET_RULES:
      return state
        .set('loadingRules', true)
        .set('errorRules', false);
    case GET_RULES_SUCCESS:
      return state
        .set('rules', action.payload)
        .set('loadingRules', false);
    case GET_RULES_FAILURE:
      return state
        .set('rules', {})
        .set('errorRules', action.error)
        .set('loadingRules', false);
    case GET_BRANDS:
      return state
      .set('errorBrands', false)
      .set('loadingBrands', true);
    case GET_BRANDS_SUCCESS:
      return state
      .set('brands', action.payload)
      .set('loadingBrands', false);
    case GET_BRANDS_FAILURE:
      return state
      .set('brands', [])
      .set('errorBrands', action.error)
      .set('loadingBrands', false);
    default:
      return state;
  }
}

export default addMustPageReducer;


/*
 *
 * BrandTopList reducer
 *
 */
/*
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
*/
