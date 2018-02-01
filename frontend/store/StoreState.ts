import { AuthStateI } from '../reducers/authenticationReducer'

export default interface StoreState {
  readonly authentication: AuthStateI
}
