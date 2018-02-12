import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { IUserRegisterDetails, AuthApi, IAuthData } from '../../api/AuthApi'
import AuthActionTypeKeys from './AuthActionTypeKeys'
import {
  ISignOutAction,
  ISignInPendingAction,
  ISignInFulfilledAction,
  ISignInRejectedAction,
  ICreateUserPendingAction,
  ICreateUserFulfilledAction,
  ICreateUserRejectedAction,
  IClearAuthErrors,
} from './AuthActionTypes'
import { User } from '../../models/User'

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
    dispatch(createUserPending())
    try {
      const response = await AuthApi.registerNewUser(userData)
      dispatch(createUserSuccess(response))
    } catch (error) {
      dispatch(createUserError(error))
    }
  }
}

export const signOut = (): ISignOutAction => ({
  type: AuthActionTypeKeys.SIGN_OUT,
})

export const signInPending = (): ISignInPendingAction => ({
  type: AuthActionTypeKeys.SIGN_IN_PENDING,
})

export const signInSuccess = (data: IAuthData): ISignInFulfilledAction => ({
  type: AuthActionTypeKeys.SIGN_IN_FULFILLED,
  payload: data,
})

export const signInError = (error: string[]): ISignInRejectedAction => ({
  type: AuthActionTypeKeys.SIGN_IN_REJECTED,
  payload: error,
})

export const createUserPending = (): ICreateUserPendingAction => ({
  type: AuthActionTypeKeys.CREATE_USER_PENDING,
})

export const createUserSuccess = (data: User): ICreateUserFulfilledAction => ({
  type: AuthActionTypeKeys.CREATE_USER_FULFILLED,
  payload: data,
})

export const createUserError = (error: string[]): ICreateUserRejectedAction => ({
  type: AuthActionTypeKeys.CREATE_USER_REJECTED,
  payload: error,
})

export const clearAuthErrors = (): IClearAuthErrors => ({
  type: AuthActionTypeKeys.CLEAR_AUTH_ERRORS,
})
