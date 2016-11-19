/*
 *
 * AddMustPage actions
 *
 */

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

export function addMustSubmit(payload) {
  return {
    type: ADD_MUST_SUBMIT,
    payload,
  };
}

export function mustAdded(payload) {
  return {
    type: ADD_MUST_SUCCESS,
    payload,
  };
}

export function mustAddedError(payload) {
  return {
    type: ADD_MUST_FAILURE,
    payload,
  };
}

export function loadRules() {
  return {
    type: GET_RULES,
  };
}

export function rulesLoaded(payload) {
  return {
    type: GET_RULES_SUCCESS,
    payload,
  };
}

export function rulesLoadingError(error) {
  return {
    type: GET_RULES_FAILURE,
    error,
  };
}

export function loadBrands() {
  return {
    type: GET_BRANDS,
  };
}


export function brandsLoaded(payload) {
  return {
    type: GET_BRANDS_SUCCESS,
    payload,
  };
}

export function brandsLoadingError(error) {
  return {
    type: GET_BRANDS_FAILURE,
    error,
  };
}
