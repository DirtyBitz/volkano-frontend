import { AuthStateI } from '../reducers/authenticationReducer'
import { ItemStateI } from '../reducers/itemsReducer'
export interface IStoreState {
  readonly authentication: AuthStateI
  readonly item: ItemStateI
}
