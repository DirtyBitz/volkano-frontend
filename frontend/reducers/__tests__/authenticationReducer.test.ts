import reducer from '../authenticationReducer'
import types from '../../actions/ActionTypeKeys'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, undefined)).toEqual(false)
  })

  it('should handle SIGN_IN', () => {
    expect(
      reducer(false, {
        type: types.SIGN_IN,
        username: 'test_user',
        password: 'test_pw',
      })
    ).toEqual(true)
  })

  it('Should handle SIGN_OUT', () => {
    expect(
      reducer(true, {
        type: types.SIGN_OUT,
      })
    ).toEqual(false)
  })
})
