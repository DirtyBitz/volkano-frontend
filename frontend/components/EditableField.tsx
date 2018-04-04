import * as React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEdit, faCheckSquare } from '@fortawesome/fontawesome-free-solid'
import { Colors } from '../constants/Colors'

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
  valueInput: any

  constructor(props) {
    super(props)
    this.state = { isEditing: false, inputValue: props.value }
  }

  private startEdit = e => {
    this.setState({ isEditing: true })
  }

  private endEdit = e => {
    this.setState({ isEditing: false })
    this.props.onSave(this.state.inputValue)
  }

  private updateInputValue = e => {
    this.setState({ inputValue: e.target.value })
  }

  private handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.endEdit(e)
    }
  }

  /* istanbul ignore next */
  private moveCaretAtEndOfInput = e => {
    let temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render() {
    const { label } = this.props
    const { isEditing, inputValue } = this.state

    return (
      <div className={isEditing ? 'editable-field is-editing' : 'editable-field'}>
        <label>{label}</label>
        {isEditing && (
          <div className="content">
            <input
              autoFocus
              onFocus={this.moveCaretAtEndOfInput}
              value={inputValue}
              onChange={this.updateInputValue}
              onKeyPress={this.handleKeyPress}
            />
            <span className="icon confirm-icon">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="1x"
                className="confirm-button"
                onClick={this.endEdit}
              />
            </span>
          </div>
        )}
        {!isEditing && (
          <div className="content">
            <span className="value">{inputValue}</span>
            <span className="icon">
              <FontAwesomeIcon
                icon={faEdit}
                size="sm"
                className="edit-button"
                onClick={this.startEdit}
              />
            </span>
          </div>
        )}
        <style jsx>{`
          .editable-field {
            border: 1px solid #bbb;
            width: 400px;
            display: flex;
            background: #f9f9f9;
            border-radius: 5px;
            font-size: 0.9em;
            margin-bottom: 10px;

            &:hover .icon {
              opacity: 1;
            }

            .content {
              width: 100%;
              display: flex;
            }

            label {
              font-weight: bold;
              margin-right: 10px;
              padding: 5px 10px 5px 10px;
              white-space: nowrap;
              border-right: 1px solid #bbb;
              min-width: 160px;
            }

            .value,
            input {
              border: 1px solid red;
              margin-right: 10px;
              flex: 1;
              border: none;
              padding: 5px 10px 5px 0;
            }

            input {
              background: transparent;
            }

            .icon {
              opacity: 0;
              transition: 0.3s opacity;
              align-self: center;
              margin-bottom: 3px;
              margin-right: 10px;

              &:hover {
                cursor: pointer;
              }
            }

            .confirm-icon {
              opacity: 1;
              margin-bottom: 0;
            }
          }

          .is-editing {
            background: ${Colors.primary};
            border: 1px solid #222;

            label {
              border-right: 1px solid #222;
            }
          }
        `}</style>
      </div>
    )
  }
}
export default EditableField
