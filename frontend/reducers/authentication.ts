import AuthActionTypeKeys from '../actions/authentication/AuthActionTypeKeys'
import AuthActionTypes from '../actions/authentication/AuthActionTypes'

export interface IAuthState {
  isLoading: boolean
  errors?: string[]
}

export const authInitialState: IAuthState = {
  isLoading: false,
}

export default function authentication(
  state = authInitialState,
  action: AuthActionTypes
): IAuthState {
  switch (action.type) {
    case AuthActionTypeKeys.AUTH_PENDING:
      return { ...state, isLoading: true }
    case AuthActionTypeKeys.AUTH_REJECTED:
      return { ...state, isLoading: false, errors: action.payload }
    case AuthActionTypeKeys.AUTH_ACCEPTED:
      return { ...state, isLoading: false, errors: undefined }
    case AuthActionTypeKeys.SIGN_OUT:
      return { ...state, isLoading: false, errors: undefined }
    case AuthActionTypeKeys.CLEAR_AUTH_ERRORS:
      return { ...state, errors: undefined }
    default:
      return state
  }
}
