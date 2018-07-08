import { UserActionTypeKeys } from './UserActionTypeKeys'
import { ISession } from '../../utils/Session'
import { IAddUserAction, IRemoveUserAction } from './UserActionTypes'

export const addUser = (session: ISession): IAddUserAction => ({
  type: UserActionTypeKeys.ADD_USER,
  payload: session,
})

export const removeUser = (): IRemoveUserAction => ({
  type: UserActionTypeKeys.REMOVE_USER,
})
