/*
 *
 * PlayerTopList reducer
 *
 */
import { fromJS } from 'immutable';
import {
  LOAD_PLAYERS,
  LOAD_PLAYERS_SUCCESS,
  LOAD_PLAYERS_ERROR,
} from './constants';


// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  players: [],
});

function playerTopListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYERS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PLAYERS_SUCCESS:
      return state
        .set('players', action.players)
        .set('loading', false);
    case LOAD_PLAYERS_ERROR:
      return state
        .set('error', action.error)
        .set('players', [])
        .set('loading', false);
    default:
      return state;
  }
}

export default playerTopListReducer;
