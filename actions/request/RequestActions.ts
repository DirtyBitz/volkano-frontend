import RequestActionTypeKeys from './RequestActionTypeKeys'
import {
  IRequestOKAction,
  IRequestUnauthorizedAction,
  IRequestUnprocessableAction,
  IRequestServerErrorAction,
  IRequestUnknownErrorAction,
} from './RequestActionTypes'

export const requestSuccess = (token: string): IRequestOKAction => ({
  type: RequestActionTypeKeys.REQUEST_OK,
  payload: token,
})

export const requestServerError = (): IRequestServerErrorAction => ({
  type: RequestActionTypeKeys.REQUEST_SERVER_ERROR,
})

export const requestUnauthorized = (): IRequestUnauthorizedAction => ({
  type: RequestActionTypeKeys.REQUEST_UNAUTHORIZED,
})

export const requestUnknownError = (): IRequestUnknownErrorAction => ({
  type: RequestActionTypeKeys.REQUEST_UNKNOWN_ERROR,
})

export const requestUnprocessable = (token: string): IRequestUnprocessableAction => ({
  type: RequestActionTypeKeys.REQUEST_UNPROCESSABLE,
  payload: token,
})
