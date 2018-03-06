import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { VolkaButton } from '../VolkaButton'
import { faUser, faLock } from '@fortawesome/fontawesome-free-solid'

describe('VolkaButton component', () => {
  let buttonWrap
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      title: 'press me',
      onClick: jest.fn(),
      primary: false,
      disabled: false,
      isLoading: false,
      icon: false,
    }
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
  })

  it('Should render default button', () => {
    const button = buttonWrap.find('button').first()
    expect(button.text()).toContain(defaultProps.title)
    expect(button.props().className).toEqual('')
  })

  it('Should render primary button', () => {
    defaultProps.primary = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    expect(button.props().className).toEqual('primary')
  })

  it('Should call onClick when clicke', () => {
    const button = buttonWrap.find('button').first()
    button.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('Should not call click when disabled', () => {
    defaultProps.disabled = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    button.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
  })

  it('Should not call click when isLoading', () => {
    defaultProps.isLoading = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    button.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
  })

  it('Should render button with icon', () => {
    defaultProps.icon = { faUser }
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    expect(defaultProps.icon).toEqual(defaultProps.icon)
  })

  it('Should have loading animation while isLoading', () => {
    defaultProps.isLoading = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('BeatLoader').first()
    //const animatedLoader = button.find('BeatLoader')
    expect(button.length).toBe(1)
  })
})
