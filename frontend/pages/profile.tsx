import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import Layout from '../components/Layout'
import { IStoreState } from '../store/StoreState'
import { signOut } from '../actions/authentication/AuthActions'
import { ISignOutAction } from '../actions/authentication/AuthActionTypes'
import { ISession, getSession, hasSession } from '../utils/Session'

interface IProps {
  signOut: () => ISignOutAction
}

class ProfilePage extends React.Component<IProps> {
  componentDidMount() {
    const isSignedIn = hasSession()
    if (!isSignedIn) Router.push('/')
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

        <button onClick={this.props.signOut}>Sign out</button>
        <style jsx>{`
          button {
            background: #b70000;
            color: #fff;
            padding: 10px 20px;
            font-size: 1em;
            display: inline-block;
            border: none;
          }

          button:hover {
            background: #7a0101;
            cursor: pointer;
          }
        `}</style>
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
