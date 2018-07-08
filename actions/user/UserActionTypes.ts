import { IOtherAction } from '../IOtherAction'
import { UserActionTypeKeys } from './UserActionTypeKeys'
import { ISession } from '../../utils/Session'

export interface IAddUserAction {
  readonly type: UserActionTypeKeys.ADD_USER
  readonly payload: ISession
}

export interface IRemoveUserAction {
  readonly type: UserActionTypeKeys.REMOVE_USER
}

type UserActionTypes = IAddUserAction | IRemoveUserAction | IOtherAction

export { UserActionTypes }
