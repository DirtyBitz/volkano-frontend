import { AuthStateI } from '../reducers/authenticationReducer'
import { ItemStateI } from '../reducers/itemReducer'
export interface IStoreState {
  readonly authentication: AuthStateI
  readonly item: ItemStateI
}
