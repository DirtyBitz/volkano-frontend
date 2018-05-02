import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import store from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import AuthApi from '../api/AuthApi'
import { SubmissionError } from 'redux-form'
import { isSignedIn } from '../utils/Auth'
import { getSession } from '../utils/Session'

class SigninPage extends React.Component {
  static async getInitialProps({ req }) {
    return { isSignedIn: await isSignedIn(req) }
  }

  private handleSubmit = async ({ login, password }) => {
    try {
      await AuthApi.signIn(login, password)
    } catch (error) {
      if (error.errors) {
        throw new SubmissionError({ login: error.errors.join('\n') })
      }
    }

    const session = getSession()
    const signedIn = await isSignedIn(session)
    if (signedIn) {
      Router.push('/')
    }
  }

  render() {
    return (
      <Layout title="Sign In" {...this.props}>
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
