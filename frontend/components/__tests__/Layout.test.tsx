import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Layout from '../Layout'
import Navigation from '../Navigation'
import Footer from '../Footer'

const props = {
  userData: undefined,
}

describe('Layout component', () => {
  let layout: ShallowWrapper<any>

  beforeEach(() => {
    layout = shallow(<Layout {...props} />)
  })

  it('Should wrap everything in a div', () => {
    expect(layout.type()).toBe('div')
  })

  it('Contains a header element', () => {
    const headers = layout.find('header')

    expect(headers.length).toBe(1)
  })

  it('Contains navigation component', () => {
    expect(layout.contains(<Navigation />)).toBe(true)
  })

  it('Contains footer component', () => {
    expect(layout.contains(<Footer />)).toBe(true)
  })

  it('Has default title if none is set', () => {
    const titleText = layout
      .find('title')
      .first()
      .text()

    expect(titleText).toBe('Volkano')
  })

  it('Changes title when title prop is set', () => {
    const fakeProps = { ...props, title: 'Testpage' }
    layout = shallow(<Layout {...fakeProps} />)
    const titleText = layout
      .find('title')
      .first()
      .text()

    expect(titleText).toBe('Testpage')
  })
})
