import { NotificationActionTypeKeys } from './NotificationActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { INotification } from '../../models/Notification'

export interface IAddNotification {
  readonly type: NotificationActionTypeKeys.ADD_NOTIFICATION
  readonly notification: INotification
}

export interface IRemoveNotification {
  readonly type: NotificationActionTypeKeys.REMOVE_NOTIFICATION
  readonly id: string
}

type NotificationActionTypes = IAddNotification | IRemoveNotification | IOtherAction

export { NotificationActionTypes }
