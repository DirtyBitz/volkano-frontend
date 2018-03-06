import authentication, {
  authInitialState,
  IAuthState,
} from '../authentication'
import {
  signInPending,
  signInAccepted,
  signInRejected,
  signOut,
  createUserPending,
  createUserAccepted,
  createUserRejected
} from '../../actions/authentication/AuthActions'
import { OtherAction } from '../../actions/IOtherAction'

describe('Authentication reducer', () => {
  it('should return the initial state', () => {
    const expectedState: IAuthState = {
      isLoading: false,
      errors: undefined,
    }

    expect(authentication(undefined, OtherAction)).toEqual(expectedState)
  })

  describe('sign in', () => {
    it('should handle pending', () => {
      const expectedState: IAuthState = {
        isLoading: true,
        errors: undefined,
      }

      const newState = authentication(authInitialState, signInPending())

      expect(newState).toEqual(expectedState)
    })

    it('should handle accepted', () => {
      const expectedState: IAuthState = {
        isLoading: false,
      }

      const state = authentication(expectedState, signInAccepted())

      expect(state).toEqual(expectedState)
    })

    it('should handle rejected', () => {
      const errors = ["this is a funny error message", "this is not so funny"]
      const expectedState: IAuthState = {
        isLoading: false,
        errors: errors,
      }

      const state = authentication(expectedState, signInRejected(errors))

      expect(state).toEqual(expectedState)
    })
  })

  describe('create user', () => {
    it('should handle pending', () => {
      const expectedState: IAuthState = {
        isLoading: true,
        errors: undefined,
      }

      const newState = authentication(authInitialState, createUserPending())

      expect(newState).toEqual(expectedState)
    })

    it('should handle accepted', () => {
      const expectedState: IAuthState = {
        isLoading: false,
      }

      const state = authentication(expectedState, createUserAccepted())

      expect(state).toEqual(expectedState)
    })

    it('should handle rejected', () => {
      const errors = ["this is a funny error message", "this is not so funny"]
      const expectedState: IAuthState = {
        isLoading: false,
        errors: errors,
      }

      const state = authentication(expectedState, createUserRejected(errors))

      expect(state).toEqual(expectedState)
    })
  })

  it('should handle when user signs out', () => {
    const expectedState: IAuthState = {
      isLoading: false,
      errors: undefined,
    }

    const state = authentication(expectedState, signOut())

    expect(state).toEqual(expectedState)
  })
})
