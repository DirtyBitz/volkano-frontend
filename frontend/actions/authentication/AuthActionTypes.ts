import AuthActionTypeKeys from './AuthActionTypeKeys'
import { IOtherAction } from '../IOtherAction'

export interface ISignInPendingAction {
  readonly type: AuthActionTypeKeys.AUTH_PENDING
}

export interface ISignInAcceptedAction {
  readonly type: AuthActionTypeKeys.AUTH_ACCEPTED
}

export interface ISignInRejectedAction {
  readonly type: AuthActionTypeKeys.AUTH_REJECTED
  readonly payload: string[]
}

export interface ISignOutAction {
  readonly type: AuthActionTypeKeys.SIGN_OUT
}

export interface ICreateUserPendingAction {
  readonly type: AuthActionTypeKeys.AUTH_PENDING
}

export interface ICreateUserAcceptedAction {
  readonly type: AuthActionTypeKeys.AUTH_ACCEPTED
}

export interface ICreateUserRejectedAction {
  readonly type: AuthActionTypeKeys.AUTH_REJECTED
  readonly payload: string[]
}

export interface IClearAuthErrors {
  readonly type: AuthActionTypeKeys.CLEAR_AUTH_ERRORS
}

type AuthActionTypes =
  | ISignInPendingAction
  | ISignInAcceptedAction
  | ISignInRejectedAction
  | ISignOutAction
  | ICreateUserPendingAction
  | ICreateUserAcceptedAction
  | ICreateUserRejectedAction
  | IClearAuthErrors
  | IOtherAction

export default AuthActionTypes
