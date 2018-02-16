import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { store } from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import { IStoreState } from '../store/StoreState'
import { signIn, clearAuthErrors } from '../actions/authentication/AuthActions'
import {
  ISignOutAction,
  IClearAuthErrors,
} from '../actions/authentication/AuthActionTypes'

interface IProps extends IStoreState {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
  clearAuthErrors: () => IClearAuthErrors
}

class SigninPage extends React.Component<IProps> {
  private handleSumbit = ({ email, password }) => {
    this.props.signIn(email, password)
  }

  componentWillReceiveProps(props) {
    if (props.authentication.user) {
      Router.push('/profile')
    }
  }

  render() {
    const { authentication } = this.props

    return (
      <Layout title="Sign In">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Sign in
        </h1>
        {authentication.errors &&
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
