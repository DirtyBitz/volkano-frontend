import { ICollectionState } from '../reducers/collection'
import { INotification } from '../models/Notification'

export interface IStoreState {
  readonly collection: ICollectionState
  readonly notifications: INotification[]
}
