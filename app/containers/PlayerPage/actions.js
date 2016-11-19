/*
 *
 * PlayerPage actions
 *
 */

import {
  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR,
} from './constants';


export function loadPlayer() {
  return {
    type: LOAD_PLAYER,
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
