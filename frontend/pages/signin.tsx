import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { store } from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import { IStoreState } from 'store/StoreState'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn, clearAuthErrors } from '../actions/authentication/AuthActions'
import { ISignOutAction, IClearAuthErrors } from 'actions/authentication/AuthActionTypes'

interface IProps extends IStoreState {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
  clearAuthErrors: () => IClearAuthErrors
}

class SigninPage extends React.Component<IProps> {
  private handleSumbit = ({ username, password }) => {
    this.props.signIn(username, password)
  }

  componentDidUpdate() {
    this.props.authentication.user && Router.push('/profile')
  }

  render() {
    const { authentication } = this.props

    return (
      <Layout userData={authentication.user}>
        {authentication.errors &&
          authentication.errors.map((error, i) => (
            <div key={i} style={{ color: 'red' }}>
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
