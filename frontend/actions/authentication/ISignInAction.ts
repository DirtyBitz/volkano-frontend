import keys from '../ActionTypeKeys'

export default interface ISignInAction {
  readonly type: keys.SIGN_IN
  readonly username: string
  readonly password: string
}
