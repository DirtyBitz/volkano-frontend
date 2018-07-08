import { ICollectionState } from '../reducers/collection'
import { INotification } from '../models/Notification'
import { IUserState } from '../reducers/user'

export interface IStoreState {
  readonly collection: ICollectionState
  readonly notifications: INotification[]
  readonly user: IUserState
  readonly form?: any
}
