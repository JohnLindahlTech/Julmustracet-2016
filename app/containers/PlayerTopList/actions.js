/*
 *
 * PlayerTopList actions
 *
 */

import {
  LOAD_PLAYERS,
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS_ERROR,
} from './constants';


export function loadPlayers() {
  return {
    type: LOAD_PLAYERS,
  };
}

export function playersLoaded(players) {
  return {
    type: LOAD_PLAYERS_SUCCESS,
    players,
  };
}

export function playersLoadingError(error) {
  return {
    type: LOAD_PLAYERS_ERROR,
    error,
  };
}
