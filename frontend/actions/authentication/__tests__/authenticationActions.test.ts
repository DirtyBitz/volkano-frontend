import * as actions from '../authenticationActions'
import types from '../../ActionTypeKeys'

describe('Authentication actions', () => {
  it('Should create a action to sign in', () => {
    const username = 'test_user'
    const password = 'test_pw'

    const expectedAction = {
      type: types.SIGN_IN,
      username,
      password,
    }
    expect(actions.signIn(username, password)).toEqual(expectedAction)
  })

  it('Should create a action to sign out', () => {
    const expectedAction = {
      type: types.SIGN_OUT,
    }
    expect(actions.signOut()).toEqual(expectedAction)
  })
})
