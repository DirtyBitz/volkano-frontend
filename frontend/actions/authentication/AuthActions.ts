import AuthActionTypeKeys from './AuthActionTypeKeys'
import { ISignOutAction, ISignInAction } from './AuthActionTypes'

export const signIn = (username: string, password: string): ISignInAction => ({
  type: AuthActionTypeKeys.SIGN_IN,
  payload: {
    username,
    password,
  },
})

export const signOut = (): ISignOutAction => ({
  type: AuthActionTypeKeys.SIGN_OUT,
})
