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

        <EditPassword onSave={newValue => console.log(newValue)} />
      </Layout>
    )
  }
}

const AuthProfilePage = withAuth(ProfilePage)

export default withRedux(store)(AuthProfilePage)
