import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import Layout from '../components/Layout'
import { IStoreState } from '../store/StoreState'
import { signOut } from '../actions/authentication/AuthActions'
import { getSession, clearSession } from '../utils/Session'
import { VolkaButton } from '../components/VolkaButton'
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { withAuth } from '../utils/withAuth'
import EditableField from '../components/EditableField'
import VolkanoRequest from '../api/VolkanoRequest'

class ProfilePage extends React.Component {
  private signOut = () => {
    clearSession()
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

        <VolkaButton icon={faSignOutAlt} title="Sign out" onClick={this.signOut} />
      </Layout>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    signOut: bindActionCreators(signOut, dispatch),
  }
}

const AuthProfilePage = withAuth(ProfilePage)

export default withRedux(store, mapStateToProps, mapDispatchToProps)(AuthProfilePage)
