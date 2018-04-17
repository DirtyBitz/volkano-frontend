import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import store from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import { hasSession } from '../utils/Session'
import AuthApi from '../api/AuthApi'
import { SubmissionError } from 'redux-form'

class SigninPage extends React.Component {
  private handleSubmit = async ({ login, password }) => {
    try {
      await AuthApi.signIn(login, password)
    } catch (error) {
      if (error.errors) {
        throw new SubmissionError({ login: error.errors.join('\n') })
      }
    }

    const isSignedIn = hasSession()
    if (isSignedIn) {
      Router.push('/profile')
    }
  }

  render() {
    return (
      <Layout fixedHeader title="Sign In">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
            marginTop: '60px',
          }}>
          Sign in
        </h1>
        <SigninForm onSubmit={this.handleSubmit} />
      </Layout>
    )
  }
}

export default withRedux(store)(SigninPage)
