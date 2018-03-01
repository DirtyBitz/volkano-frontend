import RequestActionTypeKeys from '../actions/request/RequestActionTypeKeys'
import RequestActionTypes from '../actions/request/RequestActionTypes'
import { AuthStateI } from './authenticationReducer'

export const requestInitialState: AuthStateI = {
  isLoading: false,
}

export default function authenticationReducer(
  state = requestInitialState,
  action: RequestActionTypes
): AuthStateI {
  switch (action.type) {
    case RequestActionTypeKeys.REQUEST_OK:
    case RequestActionTypeKeys.REQUEST_UNPROCESSABLE:
      return {
        ...state,
        token: action.payload,
      }
    case RequestActionTypeKeys.REQUEST_UNAUTHORIZED:
    case RequestActionTypeKeys.REQUEST_UNKNOWN_ERROR:
      return requestInitialState
    case RequestActionTypeKeys.REQUEST_SERVER_ERROR:
    default:
      return state
  }
}
