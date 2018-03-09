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
import EditProfileForm from '../components/EditProfileForm'
import EditableField from '../components/EditableField'

class ProfilePage extends React.Component {
  private signOut = () => {
    clearSession()
    Router.push('/')
  }

  render() {
    const session = getSession()

    return (
      <Layout title="Profile">
        <EditableField
          label="Nickname"
          value="test"
          onSave={newValue => console.log(newValue)}
        />
        {session &&
          session.user && (
            <div style={{ marginBottom: 15 }}>
              <p>Email: {session.user.email ? session.user.email : ''}</p>
              <p>
                Nickname:{' '}
                {session.user.nickname ? session.user.nickname : 'No nickname :('}
              </p>
            </div>
          )}
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
