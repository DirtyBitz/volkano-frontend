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
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
  url: any
}

class SigninPage extends React.Component<IProps> {
  private handleSumbit = ({ username, password }) => {
    console.log('Did sign in!')
    this.props.signIn(username, password)
  }

  render() {
    if (this.props.authentication.user) {
      Router.push('/')
    }

    return (
      <Layout userData={this.props.authentication.user}>
        <Form onSubmit={this.handleSumbit} />
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

export default withRedux(store, mapStateToProps, mapDispatchToProps)(SigninPage)
