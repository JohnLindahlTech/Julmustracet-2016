import expect from 'expect';
import addMustPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('addMustPageReducer', () => {
  it('returns the initial state', () => {
    expect(addMustPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
