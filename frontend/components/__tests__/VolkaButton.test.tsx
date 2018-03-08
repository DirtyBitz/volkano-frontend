import * as React from 'react'
import { shallow, ShallowWrapper, mount } from 'enzyme'
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

  it('Should call onClick when clicked', () => {
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
    const fontawesome = buttonWrap.find('.fa-icon').first()
    const icon = fontawesome.props()
    expect(icon.icon.faUser.iconName).toBe(faUser.iconName)
  })

  it('Should have loading animation while isLoading', () => {
    defaultProps.isLoading = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('BeatLoader').first()
    expect(button.length).toBe(1)
  })

  it('Should have a type', () => {
    defaultProps.type = 'submit'
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    expect(button.props().type).toBe(defaultProps.type)
  })
})
