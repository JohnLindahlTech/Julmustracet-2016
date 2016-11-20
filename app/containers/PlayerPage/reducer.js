/*
 *
 * PlayerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PLAYER,
  LOAD_PLAYER_SUCCESS,
  LOAD_PLAYER_ERROR,
  DELETE_DRINK_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
});

function playerPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYER:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PLAYER_SUCCESS:
      return state
        .set('player', action.player)
        .set('loading', false);
    case LOAD_PLAYER_ERROR:
      return state
        .set('error', action.error)
        .unset('brands')
        .set('loading', false);
    case DELETE_DRINK_SUCCESS:
      return state
        .set('player', fromJS(Object.assign(state.get('player'), { drinks: removeDrink(state.get('player').drinks, action.drinkId) })));

    default:
      return state;
  }
}

export default playerPageReducer;

function removeDrink(drinks, drinkId) {
//  console.log({drinks});
  return drinks.filter((drink) => drink.id !== drinkId);
}
