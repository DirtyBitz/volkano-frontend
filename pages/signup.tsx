import * as React from 'react'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'
import Router from 'next/router'
import AuthApi, { IUserRegisterDetails } from '../api/AuthApi'
import { SubmissionError } from 'redux-form'
import { connect } from 'react-redux'

class SignUpPage extends React.Component {
  private handleSubmit = async (params: IUserRegisterDetails) => {
    try {
      await AuthApi.registerNewUser(params)
      Router.push('/accountcreated')
    } catch (error) {
      if (error.errors) {
        throw new SubmissionError(error.errors)
      }
    }
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

export default connect()(SignUpPage)
