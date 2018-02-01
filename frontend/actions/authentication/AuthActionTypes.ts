import AuthActionTypeKeys from './AuthActionTypeKeys'
import { IOtherAction } from '../IOtherAction'

export interface ISignInAction {
  readonly type: AuthActionTypeKeys.SIGN_IN
  readonly payload: {
    username: string
    password: string
  }
}

export interface ISignOutAction {
  readonly type: AuthActionTypeKeys.SIGN_OUT
}

type AuthActionTypes = ISignInAction | ISignOutAction | IOtherAction

export default AuthActionTypes
