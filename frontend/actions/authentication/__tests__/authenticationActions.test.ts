import * as actions from '../AuthActions'
import AuthActionTypeKeys from '../AuthActionTypeKeys'
import { signInPending } from '../AuthActions'

describe('Authentication actions', () => {
  describe('User authenticate actions', () => {
    it('Creates a signin pending action', () => {
      const expectedSingInProgressAction = {
        type: AuthActionTypeKeys.SIGN_IN_PENDING,
      }

      const signInProgressAction = signInPending()

      expect(signInProgressAction).toEqual(expectedSingInProgressAction)
    })

    it('Creates a signin success action', () => {})

    it('Creates a signin error action', () => {})

    it('Creates a signout action', () => {})

    it('Calls the correct actions when a signin is ok', () => {})

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
