jest.mock('../../api/AuthApi')
import authenticationReducer, {
  authInitialState,
  AuthStateI,
} from '../authenticationReducer'
import { OtherAction } from '../../actions/IOtherAction'
import {
  signInPending,
  signInSuccess,
  signInError,
  signOut,
} from '../../actions/authentication/AuthActions'
import { AuthApi } from '../../api/AuthApi'

describe('Auth reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: AuthStateI = {
      isLoading: false,
      token: undefined,
      errors: undefined,
      user: undefined,
    }
    expect(authenticationReducer(undefined, OtherAction)).toEqual(expectedState)
  })

  it('Should handle sign in pending', () => {
    const expectedState: AuthStateI = {
      isLoading: true,
      token: undefined,
      errors: undefined,
      user: undefined,
    }

    const newState = authenticationReducer(authInitialState, signInPending())

    expect(newState).toEqual(expectedState)
  })

  it('Should handle when sign in is successfull', async () => {
    const mockResponse = await AuthApi.authenticateUser('fake', 'fake')

    const expectedState: AuthStateI = {
      isLoading: false,
      token: mockResponse.token,
      user: mockResponse.user,
    }

    const state = authenticationReducer(expectedState, signInSuccess(mockResponse))

    expect(state).toEqual(expectedState)
  })
  it('Should handle when sign in is rejected', async () => {
    const expectedState: AuthStateI = {
      isLoading: false,
      token: undefined,
      user: undefined,
      errors: ['this is a fake error message'],
    }

    const state = authenticationReducer(
      expectedState,
      signInError(['this is a fake error message'])
    )

    expect(state).toEqual(expectedState)
  })
  it('Should handle when user signs out', async () => {
    const expectedState: AuthStateI = {
      isLoading: false,
      token: undefined,
      user: undefined,
      errors: undefined,
    }

    const state = authenticationReducer(expectedState, signOut())

    expect(state).toEqual(expectedState)
  })
})
