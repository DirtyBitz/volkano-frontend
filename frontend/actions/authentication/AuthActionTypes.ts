import AuthActionTypeKeys from './AuthActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { IUserCreateResponse } from '../../api/AuthApi'

export interface ISignInPendingAction {
  readonly type: AuthActionTypeKeys.SIGN_IN_PENDING
}

export interface ISignInFulfilledAction {
  readonly type: AuthActionTypeKeys.SIGN_IN_FULFILLED
  readonly payload: any
}

export interface ISignInRejectedAction {
  readonly type: AuthActionTypeKeys.SIGN_IN_REJECTED
  readonly payload: string[]
}

export interface ISignOutAction {
  readonly type: AuthActionTypeKeys.SIGN_OUT
}

export interface ICreateUserPendingAction {
  readonly type: AuthActionTypeKeys.CREATE_USER_PENDING
}

export interface ICreateUserFulfilledAction {
  readonly type: AuthActionTypeKeys.CREATE_USER_FULFILLED
  readonly payload: IUserCreateResponse
}

export interface ICreateUserRejectedAction {
  readonly type: AuthActionTypeKeys.CREATE_USER_REJECTED
  readonly payload: IUserCreateResponse | string[]
}

type AuthActionTypes =
  | ISignInPendingAction
  | ISignInFulfilledAction
  | ISignInRejectedAction
  | ISignOutAction
  | ICreateUserPendingAction
  | ICreateUserFulfilledAction
  | ICreateUserRejectedAction
  | IOtherAction

export default AuthActionTypes
