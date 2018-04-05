import * as React from 'react'
import store from '../store'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import AuthApi, { IUserRegisterDetails } from '../api/AuthApi'

class SignUpPage extends React.Component {
  private handleSubmit = async (params: IUserRegisterDetails) => {
    await AuthApi.registerNewUser(params)
    Router.push('/emailconfirmation')
  }

  render() {
    return (
      <Layout title="Sign Up">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Create a user to start collecting!
        </h1>
        <SignUpForm onSubmit={this.handleSubmit} />
      </Layout>
    )
  }
}

export default withRedux(store)(SignUpPage)
