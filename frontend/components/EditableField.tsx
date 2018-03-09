import * as React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEdit, faCheckSquare } from '@fortawesome/fontawesome-free-solid'

interface IProps {
  label: string
  value: string
  onSave: (newValue: string) => void
}

interface IState {
  isEditing: boolean
  inputValue: string
}

class EditableField extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { isEditing: false, inputValue: props.value }
  }

  startEdit = e => {
    this.setState({ isEditing: true })
  }

  endEdit = e => {
    this.setState({ isEditing: false })
    this.props.onSave(this.state.inputValue)
  }

  updateInputValue = e => {
    this.setState({ inputValue: e.target.value })
  }
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.setState({ isEditing: false })
    }
  }

  render() {
    const { label, value } = this.props
    const { isEditing, inputValue } = this.state

    return (
      <div>
        {' '}
        <label>{label}</label>
        {isEditing && (
          <div>
            <input
              value={inputValue}
              onChange={this.updateInputValue}
              onKeyPress={this.handleKeyPress}
            />
            <FontAwesomeIcon
              icon={faCheckSquare}
              size="xs"
              className="confirm-button"
              onClick={this.endEdit}
            />
          </div>
        )}
        {!isEditing && (
          <div>
            <span className="value">{inputValue}</span>
            <FontAwesomeIcon
              icon={faEdit}
              size="xs"
              className="edit-button"
              onClick={this.startEdit}
            />
          </div>
        )}
      </div>
    )
  }
}
export default EditableField
