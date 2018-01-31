import keys from '../ActionTypeKeys'

export default interface ISignInAction {
  readonly type: keys.SIGN_IN
  readonly payload: {
    username: string
    password: string
  }
}
