import * as React from 'react'
import { shallow } from 'enzyme'
import EditableField from '../EditableField'
import { faEdit, faCheckSquare } from '@fortawesome/fontawesome-free-solid'

let defaultProps
let wrapper

describe('Editable field', () => {
  beforeEach(() => {
    defaultProps = { label: 'Nickname', value: 'Mellet', onSave: jest.fn() }
    renderComponent()
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should show label', () => {
    const labelText = wrapper.find('label').text()
    expect(labelText).toEqual(defaultProps.label)
  })

  it('should use prop label', () => {
    defaultProps.label = 'superSecretLabel'
    renderComponent()
    const labelText = wrapper.find('label').text()
    expect(labelText).toEqual(defaultProps.label)
  })

  it('should show value', () => {
    const valueText = wrapper.find('.value').text()
    expect(valueText).toEqual(defaultProps.value)
  })

  it('should have edit icon', () => {
    const iconName = wrapper.find('.edit-button').props().icon.iconName
    expect(iconName).toEqual(faEdit.iconName)
  })

  describe('when editing', () => {
    beforeEach(() => {
      renderComponent()
      wrapper
        .find('.edit-button')
        .first()
        .simulate('click')
    })

    it('should not show edit button', () => {
      expect(wrapper.update().find('.edit-button').length).toBe(0)
    })

    it('should not show value field', () => {
      expect(wrapper.update().find('.value')).toHaveLength(0)
    })

    it('should show input field', () => {
      expect(wrapper.update().find('input')).toHaveLength(1)
    })

    it('should show value in input', () => {
      expect(
        wrapper
          .update()
          .find('input')
          .props().value
      ).toBe(defaultProps.value)
    })

    it('should have confirm icon', () => {
      const iconName = wrapper.find('.confirm-button').props().icon.iconName
      expect(iconName).toEqual(faCheckSquare.iconName)
    })

    it('should change state when input changes', () => {
      wrapper.find('input').simulate('change', { target: { value: 'New value' } })
      const state = wrapper.state()
      expect(state.inputValue).toBe('New value')
    })

    it('should save new value', () => {
      wrapper.find('input').simulate('change', { target: { value: 'New value' } })

      wrapper
        .update()
        .find('.confirm-button')
        .first()
        .simulate('click')

      expect(
        wrapper
          .update()
          .find('.value')
          .text()
      ).toEqual('New value')
    })

    it('should call onSave when saving', () => {
      wrapper.find('input').simulate('change', { target: { value: 'New value' } })

      wrapper
        .update()
        .find('.confirm-button')
        .first()
        .simulate('click')

      expect(defaultProps.onSave).toBeCalledWith('New value')
    })

    it('should have className is-editing', () => {
      const div = wrapper.find('.editable-field')
      expect(div.hasClass('is-editing')).toBe(true)
    })
  })
})

function renderComponent() {
  wrapper = shallow(<EditableField {...defaultProps} />)
}
