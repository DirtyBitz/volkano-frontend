import authenticationReducer, {
  authInitialState,
  AuthStateI,
} from '../authenticationReducer'
import { OtherAction } from '../../actions/IOtherAction'
import { signInPending, signInSuccess } from '../../actions/authentication/AuthActions'
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

    expect(state).toBe(expectedState)
  })
})
