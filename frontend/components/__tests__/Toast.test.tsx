import * as React from 'react'
import { mount } from 'enzyme'
import { Toast } from '../Toast'
import { createNotification, NotificationSeverity } from '../../models/Notification'
jest.useFakeTimers()

describe('Notification component', () => {
  let wrapper
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      onRemoveClick: jest.fn(),
      notification: createNotification(NotificationSeverity.INFO, 'Test', 100),
    }
    wrapper = mount(<Toast {...defaultProps} />)
  })

  it('should render component', () => {
    const messageDiv = wrapper.find('.notification .content').first()
    expect(messageDiv.text()).toContain(defaultProps.notification.message)
  })

  it('calls close function when duration is over', () => {
    jest.runAllTimers()
    expect(defaultProps.onRemoveClick).toHaveBeenLastCalledWith(
      defaultProps.notification.id
    )
  })
})
