import { AuthStateI } from '../reducers/authenticationReducer'
<<<<<<< HEAD
import { CollectionStateI } from '../reducers/collectionReducer'
export interface IStoreState {
  readonly authentication: AuthStateI
  readonly collection: CollectionStateI
=======
import { ItemStateI } from '../reducers/itemsReducer'
export interface IStoreState {
  readonly authentication: AuthStateI
  readonly item: ItemStateI
>>>>>>> :pencil: Add item to storeState
}
