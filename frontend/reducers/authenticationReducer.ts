import AuthActionTypeKeys from '../actions/authentication/AuthActionTypeKeys'
import AuthActionTypes from '../actions/authentication/AuthActionTypes'
import { IUserJson } from 'models/User'

export interface AuthStateI {
  isLoading: boolean
  user?: IUserJson
  token?: string
  error?: string[]
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
    case AuthActionTypeKeys.SIGN_OUT:
      return {
        ...state,
        user: undefined,
        token: undefined,
        isLoading: false,
      }
    case AuthActionTypeKeys.SIGN_IN_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}
