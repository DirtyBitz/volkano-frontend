import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication actions', () => {
  describe('User authenticate actions', () => {
    it('Creates a signin pending action', () => {
      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_IN_PENDING,
      }

      const signInProgressAction = actions.signInPending()

      expect(signInProgressAction).toEqual(expectedSingInProgressAction)
    })

    it('Creates a signin success action', async () => {
      const mockResponse = await AuthApi.authenticateUser('fake', 'fake')

      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_IN_FULFILLED,
        payload: mockResponse,
      }

      const signInProgressAction = actions.signInSuccess(mockResponse)

      expect(signInProgressAction).toEqual(expectedSingInProgressAction)
    })

    it('Creates a signout action', () => {
      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_OUT,
      }
      const signInProgressAction = actions.signOut()

      expect(signInProgressAction).toEqual(expectedSingInProgressAction)
    })

    it('Calls the correct actions when a signin is ok', async () => {})

    // signIn thunk
    it('Calls the correct actions when a signin fails', () => {})
  })

  describe('User create actions', () => {
    it('Creates a user pending action', () => {})

    it('Creates a user success action', () => {})

    it('Creates a user error action', () => {})

    // createUser thunk
    it('Dispatches the correct actions when succesfully creating a user', () => {})
  })
})
