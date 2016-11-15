import expect from 'expect';
import { fromJS } from 'immutable';
import addMustPageReducer from '../reducer';


describe('addMustPageReducer', () => {
  it.skip('returns the initial state', () => {
    expect(addMustPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
