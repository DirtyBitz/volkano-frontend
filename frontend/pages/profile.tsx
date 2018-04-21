import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import Layout from '../components/Layout'
import { getSession } from '../utils/Session'
import { withAuth } from '../utils/withAuth'
import EditableField from '../components/EditableField'
import AuthApi from '../api/AuthApi'
import EditPassword from '../components/EditPassword'

class ProfilePage extends React.Component {
  render() {
    const session = getSession()
    return (
      <Layout title="Profile">
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
              onSave={newValue => AuthApi.updateUser({ email: newValue })}
            />

            <EditableField
              label="Nickname"
              value={session ? session.user.nickname : ''}
              onSave={newValue => AuthApi.updateUser({ nickname: newValue })}
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
      </Layout>
    )
  }
}

const AuthProfilePage = withAuth(ProfilePage)

export default withRedux(store)(AuthProfilePage)
