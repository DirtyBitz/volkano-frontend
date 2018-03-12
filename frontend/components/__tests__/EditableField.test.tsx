import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import EditableField from '../EditableField'
import { faEdit, faCheckSquare } from '@fortawesome/fontawesome-free-solid'

let defaultProps
let wrapper

describe('Editable field', () => {
  beforeEach(() => {
    defaultProps = { label: 'Nickname', value: 'Mellet', onSave: jest.fn() }
    renderComponent()
  })

  it('Renders without crashing', () => {
    expect(wrapper).toBeTruthy()
  })

  it('Should show label', () => {
    const labelText = wrapper.find('label').text()
    expect(labelText).toEqual(defaultProps.label)
  })
  it('Should use prop label', () => {
    defaultProps.label = 'superSecretLabel'
    renderComponent()
    const labelText = wrapper.find('label').text()
    expect(labelText).toEqual(defaultProps.label)
  })

  it('Should show value', () => {
    const valueText = wrapper.find('.value').text()
    expect(valueText).toEqual(defaultProps.value)
  })
  it('Should have edit icon', () => {
    const iconName = wrapper.find('.edit-button').props().icon.iconName
    expect(iconName).toEqual(faEdit.iconName)
  })

  describe('Editing field', () => {
    beforeEach(() => {
      renderComponent()
      wrapper
        .find('.edit-button')
        .first()
        .simulate('click')
    })

    it('Should not show edit button', () => {
      expect(wrapper.update().find('.edit-button').length).toBe(0)
    })

    it('Should not show value field', () => {
      expect(wrapper.update().find('.value')).toHaveLength(0)
    })

    it('Should show input field', () => {
      expect(wrapper.update().find('input')).toHaveLength(1)
    })
    it('Should show value in input', () => {
      expect(
        wrapper
          .update()
          .find('input')
          .props().value
      ).toBe(defaultProps.value)
    })

    it('Should have confirm icon', () => {
      const iconName = wrapper.find('.confirm-button').props().icon.iconName
      expect(iconName).toEqual(faCheckSquare.iconName)
    })

    it('Should change state when input changes', () => {
      wrapper.find('input').simulate('change', { target: { value: 'New value' } })
      const state = wrapper.state()
      expect(state.inputValue).toBe('New value')
    })
    it('Should save new value', () => {
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

    it('Should call onSave when saveing', () => {
      wrapper.find('input').simulate('change', { target: { value: 'New value' } })

      wrapper
        .update()
        .find('.confirm-button')
        .first()
        .simulate('click')

      expect(defaultProps.onSave).toBeCalledWith('New value')
    })

    it('Should have className is-editing when editing', () => {
      const div = wrapper.find('.editable-field')
      expect(div.hasClass('is-editing')).toBe(true)
    })
  })
})

function renderComponent() {
  wrapper = shallow(<EditableField {...defaultProps} />)
}
