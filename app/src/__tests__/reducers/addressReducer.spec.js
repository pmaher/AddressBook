import reducer from '../../reducers/addressReducer';

test('newly created test', () => {
  expect(true).toEqual(true);
})

describe('address reducer', () => {
  it('should return an empty object when the state is undefined and the action type is not recognized', () => {
    expect(reducer(undefined, 'UNKNOWN')).toEqual({});
  });
});