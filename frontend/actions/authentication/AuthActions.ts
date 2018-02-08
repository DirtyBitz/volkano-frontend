import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { IUserRegisterDetails, IUserAuthResponse, AuthApi } from '../../api/AuthApi'
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
    dispatch(signInPending())
    try {
      const response = await AuthApi.authenticateUser(username, password)
      dispatch(signInSuccess(response))
    } catch (error) {
      dispatch(signInError(error))
    }
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

export const signOut = (): ISignOutAction => ({
  type: AuthActionTypeKeys.SIGN_OUT,
})

export const signInPending = (): ISignInPendingAction => ({
  type: AuthActionTypeKeys.SIGN_IN_PENDING,
})

export const signInSuccess = (data: IUserAuthResponse): ISignInFulfilledAction => ({
  type: AuthActionTypeKeys.SIGN_IN_FULFILLED,
  payload: data,
})

export const signInError = (error: any): ISignInRejectedAction => ({
  type: AuthActionTypeKeys.SIGN_IN_REJECTED,
  payload: error,
})

export const createUserPending = (): ICreateUserPendingAction => ({
  type: AuthActionTypeKeys.CREATE_USER_PENDING,
})

export const createUserSuccess = (data: any): ICreateUserFulfilledAction => ({
  type: AuthActionTypeKeys.CREATE_USER_FULFILLED,
  payload: data,
})

export const createUserError = (error: any): ICreateUserRejectedAction => ({
  type: AuthActionTypeKeys.CREATE_USER_REJECTED,
  payload: error,
})
