import Raven from 'raven-js'
import getConfig from 'next/config'
import withSentry from '../withSentry'
import { shallow, ShallowWrapper, mount } from 'enzyme'
import { Component, createElement } from 'react'
jest.mock('raven-js')
jest.mock('next/config')

describe('withSentry', () => {
  const mockInstall = jest.fn()

  beforeEach(() => {
    getConfig.mockImplementation(() => {
      return { publicRuntimeConfig: { SENTRY_DSN: 'dummy' } }
    })
    Raven.config = jest.fn(() => {
      return {
        install: mockInstall,
      }
    })
  })

  it('sets up Raven with the provided DSN', () => {
    const normalComponent = class extends Component {
      render() {
        return createElement('div')
      }
    }

    const SentryComponent = withSentry(normalComponent)
    const wrapper = mount(createElement(SentryComponent))

    expect(Raven.config).toHaveBeenCalledWith('dummy')
    expect(mockInstall).toHaveBeenCalled()
    expect(wrapper.instance().state.error).toBe(null)
  })
})
