import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import sleep from 'sleep-promise'
import store from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import { IStoreState } from '../store/StoreState'
import { signIn, clearAuthErrors } from '../actions/authentication/AuthActions'
import {
  ISignOutAction,
  IClearAuthErrors,
} from '../actions/authentication/AuthActionTypes'
import { ISession, hasSession } from '../utils/Session'

interface IProps extends IStoreState {
  signIn: (login: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
  clearAuthErrors: () => IClearAuthErrors
  session?: ISession
}

class SigninPage extends React.Component<IProps> {
  private handleSumbit = async ({ login, password }) => {
    await sleep(500) // Fake delay just so we can see loading indicator :)
    await this.props.signIn(login, password)

    const isSignedIn = hasSession()
    if (isSignedIn) {
      Router.push('/profile')
    }
  }

  render() {
    const { authentication } = this.props

    /*if (session) {
      Router.push('/profile')
    }*/

    return (
      <Layout title="Sign In">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Sign in
        </h1>
        {authentication &&
          authentication.errors &&
          authentication.errors.map((error, i) => (
            <div
              key={i}
              style={{
                color: 'red',
                textAlign: 'center',
                height: '30px',
                whiteSpace: 'nowrap',
              }}>
              {error}
            </div>
          ))}
        <SigninForm onSubmit={this.handleSumbit} />
      </Layout>
    )
  }

  componentWillUnmount() {
    this.props.clearAuthErrors()
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    clearAuthErrors: bindActionCreators(clearAuthErrors, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(SigninPage)
