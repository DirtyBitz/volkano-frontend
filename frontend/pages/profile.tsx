import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import Layout from '../components/Layout'
import Router from 'next/router'
import { getSession } from '../utils/Session'
import { VolkaButton } from '../components/VolkaButton'
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { withAuth } from '../utils/withAuth'
import EditableField from '../components/EditableField'
import VolkanoRequest from '../api/VolkanoRequest'
import { signOut } from '../utils/Authentication'

class ProfilePage extends React.Component {
  private handleSignOut = () => {
    signOut()
    Router.push('/')
  }

  private updateUser = params => {
    VolkanoRequest.put('/auth', params)
  }

  render() {
    const session = getSession()
    return (
      <Layout title="Profile">
        <EditableField
          label="E-mail"
          value={session ? session.user.email : ''}
          onSave={newValue => this.updateUser({ email: newValue })}
        />

        <EditableField
          label="Nickname"
          value={session ? session.user.nickname : ''}
          onSave={newValue => this.updateUser({ nickname: newValue })}
        />

        <VolkaButton icon={faSignOutAlt} title="Sign out" onClick={this.handleSignOut} />
      </Layout>
    )
  }
}

const AuthProfilePage = withAuth(ProfilePage)

export default withRedux(store)(AuthProfilePage)
