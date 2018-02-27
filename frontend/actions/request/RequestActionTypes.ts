import RequestActionTypeKeys from './RequestActionTypeKeys'
import { IOtherAction } from '../IOtherAction'

export interface IRequestOKAction {
  readonly type: RequestActionTypeKeys.REQUEST_OK
  readonly token: string
}

export interface IRequestUnauthorizedAction {
  readonly type: RequestActionTypeKeys.REQUEST_UNAUTHORIZED
}

export interface IRequestUnprocessableAction {
  readonly type: RequestActionTypeKeys.REQUEST_UNPROCESSABLE
  readonly token: string
}

export interface IRequestServerErrorAction {
  readonly type: RequestActionTypeKeys.REQUEST_SERVER_ERROR
}

type RequestActionTypes =
  | IRequestOKAction
  | IRequestUnauthorizedAction
  | IRequestUnprocessableAction
  | IRequestServerErrorAction
  | IOtherAction

export default RequestActionTypes
