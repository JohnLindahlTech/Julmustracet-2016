/*
 *
 * BrandTopList actions
 *
 */

import {
  LOAD_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
} from './constants';


export function loadBrands() {
  return {
    type: LOAD_BRANDS,
  };
}

export function brandsLoaded(brands) {
  return {
    type: LOAD_BRANDS_SUCCESS,
    brands,
  };
}

export function brandsLoadingError(error) {
  return {
    type: LOAD_BRANDS_ERROR,
    error,
  };
}
