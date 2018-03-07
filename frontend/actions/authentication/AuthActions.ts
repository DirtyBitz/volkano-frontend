import AuthActionTypeKeys from './AuthActionTypeKeys'
import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { IUserRegisterDetails, AuthenticationApi } from '../../api/AuthenticationApi'
import { setSession } from '../../utils/Session'
import {
  ISignOutAction,
  ISignInPendingAction,
  ISignInAcceptedAction,
  ISignInRejectedAction,
  ICreateUserPendingAction,
  ICreateUserAcceptedAction,
  ICreateUserRejectedAction,
  IClearAuthErrors,
} from './AuthActionTypes'

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(signInPending())
    try {
      await AuthenticationApi.authenticateUser(username, password)
      dispatch(signInAccepted())
    } catch (error) {
      dispatch(signInRejected(error))
    }
  }
}

export const createUser = (userData: IUserRegisterDetails) => {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(createUserPending())
    try {
      await AuthenticationApi.registerNewUser(userData)
      dispatch(createUserAccepted())
    } catch (error) {
      dispatch(createUserRejected(error))
    }
  }
}

export const signOut = (): ISignOutAction => ({
  type: AuthActionTypeKeys.SIGN_OUT,
})

export const signInPending = (): ISignInPendingAction => ({
  type: AuthActionTypeKeys.AUTH_PENDING,
})

export const signInAccepted = (): ISignInAcceptedAction => ({
  type: AuthActionTypeKeys.AUTH_ACCEPTED,
})

export const signInRejected = (error: string[]): ISignInRejectedAction => ({
  type: AuthActionTypeKeys.AUTH_REJECTED,
  payload: error,
})

export const createUserPending = (): ICreateUserPendingAction => ({
  type: AuthActionTypeKeys.AUTH_PENDING,
})

export const createUserAccepted = (): ICreateUserAcceptedAction => ({
  type: AuthActionTypeKeys.AUTH_ACCEPTED,
})

export const createUserRejected = (error: string[]): ICreateUserRejectedAction => ({
  type: AuthActionTypeKeys.AUTH_REJECTED,
  payload: error,
})

export const clearAuthErrors = (): IClearAuthErrors => ({
  type: AuthActionTypeKeys.CLEAR_AUTH_ERRORS,
})
