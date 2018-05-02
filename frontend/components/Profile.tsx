import * as React from 'react'
import EditableField from '../components/EditableField'
import EditPassword from '../components/EditPassword'
import { ISession } from '../utils/Session'
import AuthApi from '../api/AuthApi'

interface IProps {
  session: ISession
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
    const { session } = this.props
    const { errors } = this.state
    return (
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
            value={session ? session.user.email : ''}
            onSave={newValue => this.update({ email: newValue })}
            error={errors && errors.email}
          />

          <EditableField
            label="Nickname"
            value={session ? session.user.nickname : ''}
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
    )
  }

  update = async value => {
    try {
      await AuthApi.updateUser({
        nickname: value.nickname,
        email: value.email,
      })
      this.setState({ errors: undefined })
    } catch (error) {
      this.setState({ errors: error.errors })
    }
  }
}

export default Profile
