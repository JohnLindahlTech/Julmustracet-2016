import expect from 'expect';
import { fromJS } from 'immutable';
import playerPageReducer from '../reducer';

describe('playerPageReducer', () => {
  it('returns the initial state', () => {
    expect(playerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
