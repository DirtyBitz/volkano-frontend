import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import Layout from '../components/Layout'
import { IStoreState } from '../store/StoreState'
import { signOut } from '../actions/authentication/AuthActions'
import { getSession, hasSession, clearSession } from '../utils/Session'
import { VolkaButton } from '../components/VolkaButton'
import { faUser, faLock } from '@fortawesome/fontawesome-free-solid'

interface IState {
  loading: boolean
}
class ProfilePage extends React.Component<any, IState> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    const isSignedIn = hasSession()
    if (!isSignedIn) Router.push('/')

    setTimeout(() => {
      this.setState({ loading: true })
    }, 2000)
  }

  private signOut = () => {
    clearSession()
    Router.push('/')
  }

  render() {
    const session = getSession()

    return (
      <Layout title="Profile">
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

        <VolkaButton
          isLoading={this.state.loading}
          icon={faUser}
          title="Sign out"
          onClick={this.signOut}
        />
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

export default withRedux(store, mapStateToProps, mapDispatchToProps)(ProfilePage)
