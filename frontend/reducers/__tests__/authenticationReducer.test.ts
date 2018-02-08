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

jest.mock('../../api/AuthApi')

describe('todos reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: AuthStateI = {
      isLoading: false,
      token: undefined,
      error: undefined,
      user: undefined,
    }
    expect(authenticationReducer(undefined, OtherAction)).toEqual(expectedState)
  })

  it('Should handle sign in pending', () => {
    const expectedState: AuthStateI = {
      isLoading: true,
      token: undefined,
      error: undefined,
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
      user: mockResponse.data,
      error: undefined,
    }

    const state = authenticationReducer(expectedState, signInSuccess(mockResponse))

    expect(state).toEqual(expectedState)
  })
  it('Should handle when sign in is rejected', async () => {
    const mockResponse = await AuthApi.authenticateUser('fake', 'fake')

    const expectedState: AuthStateI = {
      isLoading: false,
      token: undefined,
      user: undefined,
      error: mockResponse.errors,
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
      error: undefined,
    }

    const state = authenticationReducer(expectedState, signOut())

    expect(state).toEqual(expectedState)
  })
})
