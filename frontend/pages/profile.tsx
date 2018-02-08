import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { store } from '../store'
import Form from '../components/SigninForm'
import Layout from '../components/Layout'
import { IStoreState } from 'store/StoreState'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn, signOut } from '../actions/authentication/AuthActions'
import { ISignOutAction } from 'actions/authentication/AuthActionTypes'

interface IProps extends IStoreState {
  signOut: () => ISignOutAction
  url: any
}

class ProfilePage extends React.Component<IProps> {
  componentDidUpdate() {
    if (!this.props.authentication.user) {
      Router.push('/')
    }
  }

  render() {
    const { user } = this.props.authentication

    return (
      <Layout userData={this.props.authentication.user}>
        {user && (
          <div style={{ marginBottom: 15 }}>
            <p>Email: {user.email ? user.email : ''}</p>
            <p>Nickname: {user.nickname ? user.nickname : 'No nickname :('}</p>
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

const mapStateToProps = (state: IStoreState, ownProps = {}) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signOut: bindActionCreators(signOut, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(ProfilePage)
