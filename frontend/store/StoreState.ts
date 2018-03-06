import { IAuthState } from '../reducers/authenticationReducer'
import { CollectionStateI } from '../reducers/collectionReducer'
export interface IStoreState {
  readonly authentication: IAuthState
  readonly collection: CollectionStateI
}
