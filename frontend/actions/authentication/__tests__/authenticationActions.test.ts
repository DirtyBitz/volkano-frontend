jest.mock('../../../api/AuthApi')
import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication actions', () => {
  describe('User authenticate actions', () => {
    it('Creates a signin pending action', () => {
      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_IN_PENDING,
      }

      expect(actions.signInPending()).toEqual(expectedSingInProgressAction)
    })

    it('Creates a signin success action', async () => {
      const userData = await AuthApi.authenticateUser('username', 'password')

      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_IN_FULFILLED,
        payload: userData,
      }

      expect(actions.signInSuccess(userData)).toEqual(expectedSingInProgressAction)
    })

    it('Creates a signout action', () => {
      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_OUT,
      }

      expect(actions.signOut()).toEqual(expectedSingInProgressAction)
    })
  })

  describe('User create actions', () => {
    it('Creates a user pending action', () => {})

    it('Creates a user success action', () => {})

    it('Creates a user error action', () => {})
  })
})
