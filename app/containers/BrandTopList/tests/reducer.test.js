import expect from 'expect';
import { fromJS } from 'immutable';
import brandTopListReducer from '../reducer';


describe('brandTopListReducer', () => {
  it.skip('returns the initial state', () => {
    expect(brandTopListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
