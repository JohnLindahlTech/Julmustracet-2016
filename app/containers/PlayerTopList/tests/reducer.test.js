import expect from 'expect';
import playerTopListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('playerTopListReducer', () => {
  it('returns the initial state', () => {
    expect(playerTopListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
