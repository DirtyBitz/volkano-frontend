import * as React from 'react'
import { shallow } from 'enzyme'
import { VolkaButton } from '../VolkaButton'
import { faUser } from '@fortawesome/fontawesome-free-solid'

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

  it('should render default button', () => {
    const button = buttonWrap.find('button').first()
    expect(button.text()).toContain(defaultProps.title)
    expect(button.props().className).toEqual('')
  })

  it('should render primary button', () => {
    defaultProps.primary = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    expect(button.props().className).toEqual('primary')
  })

  it('should call onClick when clicked', () => {
    const button = buttonWrap.find('button').first()
    button.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('should be clickable when disabled', () => {
    defaultProps.disabled = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    button.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
  })

  it('Should not be clickable when loading', () => {
    defaultProps.isLoading = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    button.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
  })

  it('should render button with icon', () => {
    defaultProps.icon = { faUser }
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const fontawesome = buttonWrap.find('.fa-icon').first()
    const icon = fontawesome.props()
    expect(icon.icon.faUser.iconName).toBe(faUser.iconName)
  })

  it('should show loading animation when loading', () => {
    defaultProps.isLoading = true
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('BeatLoader').first()
    expect(button.length).toBe(1)
  })

  it('should have a type', () => {
    defaultProps.type = 'submit'
    buttonWrap = shallow(<VolkaButton {...defaultProps} />)
    const button = buttonWrap.find('button').first()
    expect(button.props().type).toBe(defaultProps.type)
  })
})
