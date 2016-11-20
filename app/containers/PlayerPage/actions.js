/*
 *
 * PlayerPage actions
 *
 */

import {
  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR,
  DELETE_DRINK,
  DELETE_DRINK_SUCCESS,
  DELETE_DRINK_ERROR,
} from './constants';


export function loadPlayer(username) {
  return {
    type: LOAD_PLAYER,
    username,
  };
}

export function playerLoaded(player) {
  return {
    type: LOAD_PLAYER_SUCCESS,
    player,
  };
}

export function playerLoadingError(error) {
  return {
    type: LOAD_PLAYER_ERROR,
    error,
  };
}

export function deleteDrink(drinkId) {
  return {
    type: DELETE_DRINK,
    drinkId,
  };
}

export function drinkDeleted(drinkId) {
  return {
    type: DELETE_DRINK_SUCCESS,
    drinkId,
  };
}

export function drinnkDeletedError(error) {
  return {
    type: DELETE_DRINK_ERROR,
    error,
  };
}
