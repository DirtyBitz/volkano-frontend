import keys from '../ActionTypeKeys'
import ISignInAction from './ISignInAction'
import ISignOutAction from './ISignOutAction'

export function signIn(username: string, password: string): ISignInAction {
  return {
    type: keys.SIGN_IN,
  }
}

export function signOut(): ISignOutAction {
  return {
    type: keys.SIGN_OUT,
  }
}
