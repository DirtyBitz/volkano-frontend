import * as React from 'react'
import AuthApi from '../api/AuthApi'
import { Button } from 'semantic-ui-react'
import { Dispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification } from '../actions/notifications/NotificationActions'
import { IStoreState } from '../store/StoreState'
import { IAddNotification } from '../actions/notifications/NotificationActionTypes'
import {
  INotification,
  createNotification,
  NotificationSeverity,
} from '../models/Notification'
import { SubmissionError } from 'redux-form'

interface IProps {
  addNotification: (notification: INotification) => IAddNotification
}

interface IState {
  isEditing: boolean
  currentPassword: string
  newPassword: string
  confirmPassword: string
  passwordsMatch: boolean
}

class EditPassword extends React.Component<IProps, IState> {
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
    try {
      await AuthApi.updatePassword(
        this.state.currentPassword,
        this.state.newPassword,
        this.state.confirmPassword
      )

      const notification = createNotification(
        NotificationSeverity.SUCCESS,
        `Password has been updated`,
        5000
      )
      this.props.addNotification(notification)

      this.setState({ isEditing: false })
    } catch (error) {
      const notification = createNotification(
        NotificationSeverity.ERROR,
        `Could not change password`,
        5000
      )
      this.props.addNotification(notification)
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
    return (
      <div className={isEditing ? 'editable-field is-editing' : 'editable-field'}>
        {!isEditing && (
          <div id="change-password-action">
            <Button
              inverted
              className="button"
              color="green"
              onClick={() => this.setState({ isEditing: true })}>
              Change password
            </Button>
          </div>
        )}

        {isEditing && (
          <div id="change-password-container">
            <div className="button">
              <Button
                inverted
                color="red"
                onClick={() => this.setState({ isEditing: false })}>
                Cancel
              </Button>
              <Button inverted color="green" onClick={this.onSubmit} type="submit">
                Change password
              </Button>
            </div>
            <div className="content">
              <label>Current password</label>
              <input
                autoFocus
                name="currentPassword"
                type="password"
                onChange={event => this.setState({ currentPassword: event.target.value })}
                value={currentPassword}
              />
            </div>
            <div className="content">
              <label>New password</label>
              <input
                name="password"
                type="password"
                onChange={this.newPasswordChange}
                value={newPassword}
              />
            </div>
            <div className="content">
              <label style={{ color: this.state.passwordsMatch ? 'black' : 'red' }}>
                Confirm password
              </label>
              <input
                type="password"
                onChange={this.confirmPasswordChange}
                value={confirmPassword}
              />
            </div>
          </div>
        )}
        <style jsx>{`
          .button {
            padding-left: 10px;
            padding-bottom: 10px;
            display: inline-block;
          }

          .content {
            border: solid 1px #bbb;
            margin-bottom: 10px;
            border-radius: 5px;
            width: 400px;
            display: flex;
            background: #f9f9f9;
            font-size: 0.9em;
            text-align: center;
          }

          label {
            font-weight: bold;
            margin-right: 10px;
            padding: 5px 10px 5px 10px;
            white-space: nowrap;
            border-right: solid 1px #bbb;
            min-width: 160px;
          }

          input {
            border: none;
            margin-right: 10px;
            flex: 1;
            padding: 5px 10px 5px 0;
            background: transparent;
          }
        `}</style>
      </div>
    )
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
  addNotification: bindActionCreators(addNotification, dispatch),
})

export default connect(undefined, mapDispatchToProps)(EditPassword)
