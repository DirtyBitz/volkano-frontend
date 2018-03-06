jest.mock('../../../api/AuthApi')
import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'

describe('Authentication actions', () => {
  describe('for signin', () => {
    it('creates pending action', () => {
      const expected = {
        type: AuthActionTypeKeys.AUTH_PENDING,
      }

      expect(actions.signInPending()).toEqual(expected)
    })

    it('creates accepted action', () => {
      const expected = {
        type: AuthActionTypeKeys.AUTH_ACCEPTED,
      }

      expect(actions.signInAccepted()).toEqual(expected)
    })

    it('creates a signout action', () => {
      const expected = {
        type: AuthActionTypeKeys.SIGN_OUT,
      }

      expect(actions.signOut()).toEqual(expected)
    })
  })

  describe('for signup', () => {
    it('creates pending action', () => {
      const expected = {
        type: AuthActionTypeKeys.AUTH_PENDING,
      }

      expect(actions.createUserPending()).toEqual(expected)
    })

    it('creates accepted action', async () => {
      const expected = {
        type: AuthActionTypeKeys.AUTH_ACCEPTED,
      }

      expect(actions.createUserSuccess()).toEqual(expected)
    })

    it('creates rejected action', () => {
      const errors = ["Error omg"]
      const expected = {
        type: AuthActionTypeKeys.AUTH_REJECTED,
        payload: errors,
      }

      expect(actions.createUserError(expected.payload)).toEqual(expected)
    })
  })
})
