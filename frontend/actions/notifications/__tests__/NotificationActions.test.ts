import * as actions from '../NotificationActions'
import { NotificationActionTypeKeys } from '../NotificationActionTypeKeys'
import { createNotification, NotificationSeverity } from '../../../models/Notification'

describe('Notification actions', () => {
  it('creates an add notification action', () => {
    const notification = createNotification(NotificationSeverity.INFO, 'test')

    const expected = {
      type: NotificationActionTypeKeys.ADD_NOTIFICATION,
      notification,
    }

    expect(actions.addNotification(notification)).toEqual(expected)
  })

  it('creates a remove notification action', () => {
    const expected = {
      type: NotificationActionTypeKeys.REMOVE_NOTIFICATION,
      id: 'test',
    }

    expect(actions.removeNotification('test')).toEqual(expected)
  })
})
