import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'

describe('Authentication actions', () => {
  it('Should create a action to sign in', () => {
    const username = 'test_user'
    const password = 'test_pw'

    const createdAction = actions.signIn(username, password)

    const expectedAction = {
      type: AuthActionTypeKeys.SIGN_IN,
      payload: {
        username,
        password,
      },
    }

    expect(createdAction).toEqual(expectedAction)
  })

  it('Should create a action to sign out', () => {
    const createdAction = actions.signOut()

    const expectedAction = {
      type: AuthActionTypeKeys.SIGN_OUT,
    }

    expect(createdAction).toEqual(expectedAction)
  })
})
