import AuthActionTypeKeys from '../actions/authentication/AuthActionTypeKeys'
import AuthActionTypes from '../actions/authentication/AuthActionTypes'
import { User } from 'models/User'

export interface AuthStateI {
  isLoading: boolean
  user?: User
  token?: string
  errors?: string[]
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
        errors: undefined,
      }
    case AuthActionTypeKeys.SIGN_IN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      }
    case AuthActionTypeKeys.SIGN_OUT:
      return {
        ...state,
        user: undefined,
        token: undefined,
        errors: undefined,
        isLoading: false,
      }
    case AuthActionTypeKeys.SIGN_IN_REJECTED:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      }
    case AuthActionTypeKeys.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: undefined,
      }
    default:
      return state
  }
}
