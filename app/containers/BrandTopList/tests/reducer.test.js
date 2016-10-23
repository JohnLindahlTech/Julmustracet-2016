import expect from 'expect';
import brandTopListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('brandTopListReducer', () => {
  it('returns the initial state', () => {
    expect(brandTopListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
