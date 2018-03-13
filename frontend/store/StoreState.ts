import { IAuthState } from '../reducers/authentication'
import { CollectionStateI } from '../reducers/collectionReducer'
export interface IStoreState {
  readonly authentication: IAuthState
  readonly collection: CollectionStateI
}
