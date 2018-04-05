import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import store from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import { hasSession } from '../utils/Session'
import AuthApi from '../api/AuthApi'

class SigninPage extends React.Component {
  private handleSubmit = async ({ login, password }) => {
    await AuthApi.signIn(login, password)

    const isSignedIn = hasSession()
    if (isSignedIn) {
      Router.push('/profile')
    }
  }

  render() {
    return (
      <Layout title="Sign In">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Sign in
        </h1>
        <SigninForm onSubmit={this.handleSubmit} />
      </Layout>
    )
  }
}

export default withRedux(store)(SigninPage)
