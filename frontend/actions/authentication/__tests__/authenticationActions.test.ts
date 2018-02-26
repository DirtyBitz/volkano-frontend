jest.mock('../../../api/AuthApi')
import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication actions', () => {
  describe('for signin', () => {
    it('creates a signin pending action', () => {
      const expected = {
        type: AuthActionTypeKeys.SIGN_IN_PENDING,
      }

      expect(actions.signInPending()).toEqual(expected)
    })

    it('creates a signin success action', async () => {
      const userData = await AuthApi.authenticateUser('username', 'password')

      const expected = {
        type: AuthActionTypeKeys.SIGN_IN_FULFILLED,
        payload: userData,
      }

      expect(actions.signInSuccess(userData)).toEqual(expected)
    })

    it('creates a signout action', () => {
      const expected = {
        type: AuthActionTypeKeys.SIGN_OUT,
      }

      expect(actions.signOut()).toEqual(expected)
    })
  })

  describe('for signup', () => {
    it('creates a user pending action', () => {
      const expected = {
        type: AuthActionTypeKeys.CREATE_USER_PENDING,
      }

      expect(actions.createUserPending()).toEqual(expected)
    })

    it('creates a user success action', async () => {
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

    it('creates a user error action', () => {
      const expected = {
        type: AuthActionTypeKeys.CREATE_USER_REJECTED,
        payload: ['Error omg'],
      }

      expect(actions.createUserError(expected.payload)).toEqual(expected)
    })
  })
})
