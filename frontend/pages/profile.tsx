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

class ProfilePage extends React.Component {
  private signOut = () => {
    clearSession()
    Router.push('/')
  }

  render() {
    const session = getSession()
    console.log(session)
    return (
      <Layout title="Profile">
        <EditableField
          label="E-mail"
          value={session ? session.user.email : ''}
          onSave={newValue => console.log(newValue)}
        />

        <EditableField
          label="Nickname"
          value={session ? session.user.nickname : ''}
          onSave={newValue => console.log(newValue)}
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
