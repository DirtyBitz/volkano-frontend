import { notificationReducer, INITIAL_NOTIFICATION_STATE } from '../notifications'
import { createNotification, NotificationSeverity } from '../../models/Notification'
import {
  removeNotification,
  addNotification,
} from '../../actions/notifications/NotificationActions'
import { OtherAction } from '../../actions/IOtherAction'

describe('Notification reducer', () => {
  it('should return the initial state', () => {
    const expectedState = []

    const state = notificationReducer(INITIAL_NOTIFICATION_STATE, OtherAction)

    expect(state).toEqual(expectedState)
  })

  it('should add notification', () => {
    const notificationToAdd = createNotification(NotificationSeverity.INFO, 'test')

    const expectedState = [notificationToAdd]

    const state = notificationReducer(
      INITIAL_NOTIFICATION_STATE,
      addNotification(notificationToAdd)
    )

    expect(state).toEqual(expectedState)
  })

  it('should remove notification', () => {
    const notificationToRemove = createNotification(NotificationSeverity.INFO, 'test')

    // Pass in undefined to cover default value of state in reducer
    const state = notificationReducer(undefined, addNotification(notificationToRemove))

    const newState = notificationReducer(
      state,
      removeNotification(notificationToRemove.id)
    )

    expect(newState.length).toEqual(0)
  })
})
