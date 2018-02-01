import AuthActionTypeKeys from '../actions/authentication/AuthActionTypeKeys'
import AuthActionTypes from '../actions/authentication/AuthActionTypes'

export interface AuthStateI {
  isAuthenticated: boolean
  tokens?: {
    refresh_token: string
    access_token: string
  }
}

export const authInitialState: AuthStateI = {
  isAuthenticated: false,
  tokens: undefined,
}

export default function authenticationReducer(
  state = authInitialState,
  action: AuthActionTypes
): AuthStateI {
  switch (action.type) {
    case AuthActionTypeKeys.SIGN_IN:
      return {
        isAuthenticated: true,
        tokens: {
          refresh_token: '',
          access_token: '',
        },
      }
    case AuthActionTypeKeys.SIGN_OUT:
      return {
        isAuthenticated: false,
        tokens: undefined,
      }
    default:
      return state
  }
}
