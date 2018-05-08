import * as React from 'react'
import { shallow } from 'enzyme'
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
    wrapper = shallow(<Toast {...defaultProps} />)
  })

  it('should render component', () => {
    const messageDiv = wrapper.find('.notification-msg').first()
    expect(messageDiv.text()).toContain(defaultProps.notification.message)
  })

  it('has correct className when severity is info', () => {
    const mainDiv = wrapper.find('.notification').first()
    expect(mainDiv.props().className).toEqual('notification info')
  })

  it('has correct className when severity is error', () => {
    const errorProps = {
      ...defaultProps,
      notification: createNotification(NotificationSeverity.ERROR, 'Testing error'),
    }
    wrapper = shallow(<Toast {...errorProps} />)
    const mainDiv = wrapper.find('.notification').first()
    expect(mainDiv.props().className).toEqual('notification error')
  })

  it('has correct className when severity is warning', () => {
    const warningProps = {
      ...defaultProps,
      notification: createNotification(NotificationSeverity.WARNING, 'Testing warning'),
    }
    wrapper = shallow(<Toast {...warningProps} />)
    const mainDiv = wrapper.find('.notification').first()
    expect(mainDiv.props().className).toEqual('notification warning')
  })

  it('has correct className when severity is success', () => {
    const successProps = {
      ...defaultProps,
      notification: createNotification(NotificationSeverity.SUCCESS, 'Testing success'),
    }
    wrapper = shallow(<Toast {...successProps} />)
    const mainDiv = wrapper.find('.notification').first()
    expect(mainDiv.props().className).toEqual('notification success')
  })

  it('calls close function when duration is over', () => {
    jest.runAllTimers()
    expect(defaultProps.onRemoveClick).toHaveBeenLastCalledWith(
      defaultProps.notification.id
    )
  })
})
