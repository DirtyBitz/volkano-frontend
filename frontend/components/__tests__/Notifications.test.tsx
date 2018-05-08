import * as React from 'react'
import { shallow } from 'enzyme'
import { Notifications } from '../Notifications'
import { createNotification, NotificationSeverity } from '../../models/Notification'
jest.useFakeTimers()

describe('Notification component', () => {
  let wrapper
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      notifications: [],
      removeNotification: jest.fn(),
    }
    wrapper = shallow(<Notifications {...defaultProps} />)
  })

  it('should render component', () => {
    const messageDiv = wrapper.find('#notifications').first()
    expect(messageDiv).toBeTruthy()
  })

  it('should render toasts when suplied', () => {
    const testToast = createNotification(NotificationSeverity.INFO, 'test', 5000)
    defaultProps.notifications.push(testToast)
    wrapper = shallow(<Notifications {...defaultProps} />)

    const foundToast = wrapper.find('Toast').first()
    expect(foundToast).toBeTruthy()
  })
})
