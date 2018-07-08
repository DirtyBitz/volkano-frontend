import { NotificationActionTypeKeys } from './NotificationActionTypeKeys'
import { IAddNotification, IRemoveNotification } from './NotificationActionTypes'
import { INotification } from '../../models/Notification'

export const addNotification = (notification: INotification): IAddNotification => ({
  type: NotificationActionTypeKeys.ADD_NOTIFICATION,
  notification,
})

export const removeNotification = (id: string): IRemoveNotification => ({
  type: NotificationActionTypeKeys.REMOVE_NOTIFICATION,
  id,
})
