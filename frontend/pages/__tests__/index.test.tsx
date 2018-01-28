import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import App from '../index'

describe('App home page', () => {
  let component: ShallowWrapper<any>

  beforeEach(() => {
    component = shallow(<App />)
  })

  it('has a title', () => {
    const title = component.find('title').text()

    expect(title).toBe('App Name')
  })

  it('greets the world', () => {
    const heading = component.find('h1').text()

    expect(heading).toBe('Hello World!')
  })
})
