import Footer from '../Footer'
import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

describe('Footer component', () => {
  let footer: ShallowWrapper<any>

  beforeEach(() => {
    footer = shallow(<Footer />)
  })

  it('renders current year', () => {
    const currentYear = new Date().getFullYear()
    expect(footer.text()).toContain(currentYear)
  })
})
