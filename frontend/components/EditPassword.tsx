import * as React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEdit, faCheckSquare } from '@fortawesome/fontawesome-free-solid'
import { Colors } from '../constants/Colors'
import { VolkaButton } from './VolkaButton'
import { AuthenticationApi } from '../api/AuthenticationApi'

interface IProps {
  onSave: (newValue: string) => void
}

interface IState {
  isEditing: boolean
  currentPassword: string
  newPassword: string
  confirmPassword: string
  passwordsMatch: boolean
  successMessage?: string
  errorMessage?: string
}

class EditPassword extends React.Component<IProps, IState> {
  valueInput: any

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
      passwordsMatch: true,
    }
  }

  private onSubmit = async () => {
    // Sende request
    try {
      const response = await AuthenticationApi.changeUserPassword(
        this.state.currentPassword,
        this.state.newPassword,
        this.state.confirmPassword
      )
      // Set asuccess message and change to not editing
      console.log('OK with msg:', response.data.message)
      this.setState({ successMessage: response.data.message, isEditing: false })
    } catch (error) {
      console.error('Error with msg:', error.message)
      this.setState({ errorMessage: error.message, isEditing: false })
    }
  }

  private newPasswordChange = event => {
    this.setState({ newPassword: event.target.value })
  }

  private confirmPasswordChange = event => {
    const matching = this.state.newPassword === event.target.value
    this.setState({
      confirmPassword: event.target.value,
      passwordsMatch: matching,
    })
  }

  render() {
    const { isEditing, confirmPassword, newPassword, currentPassword } = this.state

    console.log(this.state)

    return (
      <div className={isEditing ? 'editable-field is-editing' : 'editable-field'}>
        {!isEditing && (
          <div id="change-password-action">
            <span>{this.state.successMessage}</span>
            <span>{this.state.errorMessage}</span>
            <VolkaButton
              title="Change Password"
              onClick={() => this.setState({ isEditing: true })}
            />
          </div>
        )}

        {isEditing && (
          <div id="change-password-container">
            <div className="content">
              <label>Current password</label>
              <input
                autoFocus
                type="password"
                onChange={event => this.setState({ currentPassword: event.target.value })}
                value={currentPassword}
              />
            </div>
            <div className="content">
              <label>New Password</label>
              <input
                type="password"
                onChange={this.newPasswordChange}
                value={newPassword}
              />
            </div>
            <div className="content">
              <label style={{ color: this.state.passwordsMatch ? 'black' : 'red' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                onChange={this.confirmPasswordChange}
                value={confirmPassword}
              />
            </div>
            <VolkaButton title="Change password" onClick={this.onSubmit} />
          </div>
        )}
      </div>
    )
  }
}

export default EditPassword
