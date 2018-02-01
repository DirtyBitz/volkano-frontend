import authenticationReducer, {
  authInitialState,
  AuthStateI,
} from '../authenticationReducer'
import { OtherAction } from '../../actions/IOtherAction'
import { signOut, signIn } from '../../actions/authentication/AuthActions'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    const expectedState: AuthStateI = {
      isAuthenticated: false,
      tokens: undefined,
    }

    expect(authenticationReducer(undefined, OtherAction)).toEqual(expectedState)
  })

  it('should handle SIGN_IN', () => {
    const expectedState: AuthStateI = {
      isAuthenticated: true,
      tokens: {
        refresh_token: '',
        access_token: '',
      },
    }

    const newState = authenticationReducer(authInitialState, signIn('test', 'test'))

    expect(newState).toEqual(expectedState)
  })

  it('Should handle SIGN_OUT', () => {
    const currentState: AuthStateI = {
      isAuthenticated: false,
      tokens: {
        refresh_token: '',
        access_token: '',
      },
    }

    const newState = authenticationReducer(currentState, signOut())

    const expectedState: AuthStateI = {
      isAuthenticated: false,
      tokens: undefined,
    }

    expect(newState).toEqual(expectedState)
  })
})
