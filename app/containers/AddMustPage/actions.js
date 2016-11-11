/*
 *
 * AddMustPage actions
 *
 */

import {
  ADD_MUST_SUBMIT,
} from './constants';

export function addMustSubmit(payload) {
  return {
    type: ADD_MUST_SUBMIT,
    payload,
  };
}
