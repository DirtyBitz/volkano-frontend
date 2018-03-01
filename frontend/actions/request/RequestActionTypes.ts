import RequestActionTypeKeys from './RequestActionTypeKeys'
import { IOtherAction } from '../IOtherAction'

export interface IRequestOKAction {
  readonly type: RequestActionTypeKeys.REQUEST_OK
  readonly payload: string
}

export interface IRequestUnprocessableAction {
  readonly type: RequestActionTypeKeys.REQUEST_UNPROCESSABLE
  readonly payload: string
}

export interface IRequestUnauthorizedAction {
  readonly type: RequestActionTypeKeys.REQUEST_UNAUTHORIZED
}

export interface IRequestServerErrorAction {
  readonly type: RequestActionTypeKeys.REQUEST_SERVER_ERROR
}

export interface IRequestUnknownErrorAction {
  readonly type: RequestActionTypeKeys.REQUEST_UNKNOWN_ERROR
}

type RequestActionTypes =
  | IRequestOKAction
  | IRequestUnauthorizedAction
  | IRequestUnprocessableAction
  | IRequestServerErrorAction
  | IRequestUnknownErrorAction
  | IOtherAction

export default RequestActionTypes
