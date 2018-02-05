import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { IUserRegisterDetails, IUserAuthResponse } from '../../api/AuthApi'
import AuthActionTypeKeys from './AuthActionTypeKeys'
import {
  ISignOutAction,
  ISignInPendingAction,
  ISignInFulfilledAction,
  ISignInRejectedAction,
  ICreateUserPendingAction,
  ICreateUserFulfilledAction,
  ICreateUserRejectedAction,
} from './AuthActionTypes'

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Dispatch a sign in in progress action
    // use auth api to async authenticate
    // Dispatch siginsuccess if ok, signinerror if failed
  }
}

export const createUser = (userData: IUserRegisterDetails) => {
  return async (dispatch: Dispatch<IStoreState>) => {
    /* dispatch createUserInProgress (for loading indicator)
     * use auth api to async create user
     * => dispatch signInSuccess if ok
     * => dispatch signInError if failed */
  }
}

export const signOut = (): ISignOutAction => ({})

export const signInPending = (): ISignInPendingAction => ({
  type: AuthActionTypeKeys.SIGN_IN_PENDING,
})

export const signInSuccess = (data: IUserAuthResponse): ISignInFulfilledAction => ({})

export const signInError = (error: any): ISignInRejectedAction => ({})

export const createUserPending = (): ICreateUserPendingAction => ({})

export const createUserSuccess = (data: any): ICreateUserFulfilledAction => ({})

export const createUserError = (): ICreateUserRejectedAction => ({})
