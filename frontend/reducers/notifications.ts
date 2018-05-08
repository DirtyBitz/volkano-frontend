import { NotificationActionTypes } from '../actions/notifications/NotificationActionTypes'
import { INotification } from '../models/Notification'
import { NotificationActionTypeKeys } from '../actions/notifications/NotificationActionTypeKeys'

export const INITIAL_NOTIFICIATION_STATE: INotification[] = []

export const notificationReducer = (
  state = INITIAL_NOTIFICIATION_STATE,
  action: NotificationActionTypes
) => {
  switch (action.type) {
    case NotificationActionTypeKeys.ADD_NOTIFICATION:
      return [...state, action.notification]
    case NotificationActionTypeKeys.REMOVE_NOTIFICATION:
      const filteredNotifications = state.filter(
        notification => notification.id !== action.id
      )
      return filteredNotifications
    default:
      return state
  }
}
