import * as React from 'react'
import EditableField from '../components/EditableField'
import EditPassword from '../components/EditPassword'
import AuthApi from '../api/AuthApi'
import { IStoreState } from '../store/StoreState'
import { Dispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification } from '../actions/notifications/NotificationActions'
import { addUser } from '../actions/user/UserActions'
import {
  INotification,
  createNotification,
  NotificationSeverity,
} from '../models/Notification'
import { IAddNotification } from '../actions/notifications/NotificationActionTypes'
import { IUserState } from '../reducers/user'
import { IUser } from '../models/User'

interface IProps {
  userState: IUserState
  addNotification: (notification: INotification) => IAddNotification
  addUser: (user: IUser) => void
}

interface IState {
  errors?: any
}

class Profile extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { errors: undefined }
  }

  render() {
    const {
      userState: {
        session: { user },
      },
    } = this.props
    const { errors } = this.state
    return (
      <div>
        <div />
        <div
          style={{
            border: 'solid #bbb 1px',
            borderRadius: '10px',
            width: '420px',
            backgroundColor: '#e9ebed',
            margin: '0 auto',
            marginTop: '100px',
            textAlign: 'center',
          }}>
          <div
            style={{
              paddingLeft: '10px',
              paddingTop: '10px',
            }}>
            <EditableField
              label="E-mail"
              value={user.email}
              onSave={newValue => this.update({ email: newValue })}
              error={errors && errors.email}
            />

            <EditableField
              label="Nickname"
              value={user.nickname || ''}
              onSave={newValue => this.update({ nickname: newValue })}
              error={errors && errors.nickname}
            />
            <div
              style={{
                textAlign: 'right',
                paddingBottom: '10px',
                paddingRight: '10px',
              }}>
              <EditPassword />
            </div>
          </div>
        </div>
      </div>
    )
  }

  update = async value => {
    try {
      const attribute = Object.keys(value)[0]
      const params = {
        [attribute]: value[attribute],
      }
      const user = await AuthApi.updateUser(params)
      this.props.addUser(user)
      this.setState({ errors: undefined })
      const notification = createNotification(
        NotificationSeverity.SUCCESS,
        `Successfully updated ${attribute}.`,
        5000
      )
      this.props.addNotification(notification)
    } catch (error) {
      this.setState({ errors: error.errors })
    }
  }
}

/* istanbul ignore next */
const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
  addNotification: bindActionCreators(addNotification, dispatch),
  addUser: bindActionCreators(addUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
