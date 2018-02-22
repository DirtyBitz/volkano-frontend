import { AuthStateI } from '../reducers/authenticationReducer'
import { CollectionStateI } from '../reducers/collectionReducer'
export interface IStoreState {
  readonly authentication: AuthStateI
  readonly collection: CollectionStateI
}
