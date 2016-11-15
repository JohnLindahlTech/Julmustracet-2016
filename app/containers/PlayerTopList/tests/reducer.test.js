import expect from 'expect';
import { fromJS } from 'immutable';
import playerTopListReducer from '../reducer';


describe('playerTopListReducer', () => {
  it.skip('returns the initial state', () => {
    expect(playerTopListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
