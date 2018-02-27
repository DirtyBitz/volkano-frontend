import RequestActionTypeKeys from './RequestActionTypeKeys'

export interface IRequestSucceededAction {
  readonly type: RequestActionTypeKeys.REQUEST_SUCCEEDED
  readonly token: string
}

export interface IRequestFailedAction {
  readonly type: RequestActionTypeKeys.REQUEST_FAILED
  readonly status: number
}

type RequestActionTypes = IRequestSucceededAction | IRequestFailedAction

export default RequestActionTypes
