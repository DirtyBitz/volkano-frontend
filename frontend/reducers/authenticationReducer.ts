import AuthActionTypeKeys from '../actions/authentication/AuthActionTypeKeys'
import AuthActionTypes from '../actions/authentication/AuthActionTypes'

export interface AuthStateI {
  isLoading: boolean
  user?: Object
  token?: string
  error?: Error
}

export const authInitialState: AuthStateI = {
  isLoading: false,
}

export default function authenticationReducer(
  state = authInitialState,
  action: AuthActionTypes
): AuthStateI {
  switch (action.type) {
    case AuthActionTypeKeys.SIGN_IN_PENDING:
      return {
        ...state,
        isLoading: true,
      }
    case AuthActionTypeKeys.SIGN_IN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data,
        token: action.payload.token,
      }
    // TODO: Add missing actions
    default:
      return state
  }
}
