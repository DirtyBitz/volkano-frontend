jest.mock('../../../api/AuthApi')
import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication actions', () => {
  describe('User authenticate actions', () => {
    it('Creates a signin pending action', () => {
      const expected = {
        type: AuthActionTypeKeys.SIGN_IN_PENDING,
      }

      expect(actions.signInPending()).toEqual(expected)
    })

    it('Creates a signin success action', async () => {
      const userData = await AuthApi.authenticateUser('username', 'password')

      const expected = {
        type: AuthActionTypeKeys.SIGN_IN_FULFILLED,
        payload: userData,
      }

      expect(actions.signInSuccess(userData)).toEqual(expected)
    })

    it('Creates a signout action', () => {
      const expected = {
        type: AuthActionTypeKeys.SIGN_OUT,
      }

      expect(actions.signOut()).toEqual(expected)
    })
  })

  describe('User create actions', () => {
    it('Creates a user pending action', () => {
      const expected = {
        type: AuthActionTypeKeys.CREATE_USER_PENDING,
      }

      expect(actions.createUserPending()).toEqual(expected)
    })

    it('Creates a user success action', async () => {
      const data = await AuthApi.registerNewUser({
        email: 'test@user.com',
        password: 'pw',
      })

      const expected = {
        type: AuthActionTypeKeys.CREATE_USER_FULFILLED,
        payload: data,
      }

      expect(actions.createUserSuccess(data)).toEqual(expected)
    })

    it('Creates a user error action', () => {
      const expected = {
        type: AuthActionTypeKeys.CREATE_USER_REJECTED,
        payload: ['Error omg'],
      }

      expect(actions.createUserError(expected.payload)).toEqual(expected)
    })
  })
})
