import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Layout } from '../Layout'
import Footer from '../Footer'
import { setSession, ISession } from '../../utils/Session'
import ReactGA from 'react-ga'
import getConfig from 'next/config'
jest.mock('next/config')
jest.mock('react-ga')
jest.mock('../../utils/Session')

describe('Layout component', () => {
  let layout: ShallowWrapper<{}, { session: ISession; dropDownOpen: boolean }>

  beforeEach(() => {
    layout = shallow(<Layout />)
  })

  it('should wrap everything in a div', () => {
    expect(layout.type()).toBe('div')
  })

  it('contains a header element', () => {
    const headers = layout.find('header')
    expect(headers.length).toBe(1)
  })

  it('contains navigation component', () => {
    const nav = layout.find('Navigation')
    expect(nav.length).toBe(1)
  })

  it('contains footer component', () => {
    expect(layout.contains(<Footer />)).toBe(true)
  })

  it('has default title if none is set', () => {
    const titleText = layout
      .find('title')
      .first()
      .text()

    expect(titleText).toBe('Volkano')
  })

  it('changes title when title prop is set', () => {
    const fakeProps = { title: 'Testpage' }
    layout = shallow(<Layout {...fakeProps} />)
    const titleText = layout
      .find('title')
      .first()
      .text()

    expect(titleText).toBe('Testpage')
  })

  it('knows about the session', () => {
    const { session } = layout.state()
    expect(session).toBeTruthy()
  })

  it('has a dropdown menu when dropDownOpen is true and session is true', () => {
    layout.setState({
      dropDownOpen: true,
    })
    const divs = layout.find('div')
    const burgerlink = divs.filterWhere(
      (div: any) => div.prop('className') === 'dropdown-menu'
    )

    expect(burgerlink.length).toBe(1)
  })

  it('knows when there is no session', () => {
    setSession(undefined)
    layout = shallow(<Layout />)
    const { session } = layout.state()
    expect(session).toBeFalsy()
  })

  it('has a dropdown menu when dropDownOpen is true', () => {
    layout.setState({ dropDownOpen: true })
    const divs = layout.find('div')
    const burgerlink = divs.filterWhere(
      (div: any) => div.prop('className') === 'dropdown-menu'
    )

    expect(burgerlink.length).toBe(1)
  })

  it('does not have a dropdown menu when dropDownOpen is false', () => {
    layout.setState({ dropDownOpen: false })
    const divs = layout.find('div')
    const burgerlink = divs.filterWhere(
      (div: any) => div.prop('className') === 'dropdown-menu'
    )

    expect(burgerlink.length).toBe(0)
  })

  describe('Google Analytics', () => {
    beforeEach(() => {
      ReactGA.initialize = jest.fn()
      ReactGA.pageview = jest.fn()
    })

    it('runs in production', () => {
      getConfig.mockImplementation(() => {
        return { publicRuntimeConfig: { ENV: 'production' } }
      })

      layout = shallow(<Layout />)
      expect(getConfig).toHaveBeenCalled()
      expect(ReactGA.initialize).toHaveBeenCalledTimes(1)
      expect(ReactGA.pageview).toHaveBeenCalledTimes(1)
    })

    it('does not run unless explicitly in production mode', () => {
      getConfig.mockImplementation(jest.fn())
      layout = shallow(<Layout />)
      expect(getConfig).toHaveBeenCalled()
      expect(ReactGA.initialize).not.toHaveBeenCalled()
      expect(ReactGA.pageview).not.toHaveBeenCalled()
    })
  })
})
