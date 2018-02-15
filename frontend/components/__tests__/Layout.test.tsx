import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Layout } from '../Layout'
import Footer from '../Footer'

const props = {
  authentication: undefined,
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
    const nav = layout.find('Navigation')
    expect(nav.length).toBe(1)
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
