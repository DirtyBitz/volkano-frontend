import { UserActionTypes } from '../actions/user/USerActionTypes'
import { UserActionTypeKeys } from '../actions/user/UserActionTypeKeys'
import { ISession } from '../utils/Session'

export interface IUserState {
  session?: ISession
}

export const INITIAL_USER_STATE: IUserState = {
  session: null,
}

export const userReducer = (
  state = INITIAL_USER_STATE,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case UserActionTypeKeys.ADD_USER:
      return { ...state, session: action.payload }
    case UserActionTypeKeys.REMOVE_USER:
      return { ...state, session: null }
    default:
      return state
  }
}
