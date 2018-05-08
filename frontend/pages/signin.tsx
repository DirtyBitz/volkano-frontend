import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import store from '../store'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import AuthApi from '../api/AuthApi'
import { SubmissionError } from 'redux-form'
import { isSignedIn } from '../utils/Auth'
import { getSession } from '../utils/Session'
import { Dispatch } from 'react-redux'
import { IStoreState } from '../store/StoreState'
import {
  INotification,
  createNotification,
  NotificationSeverity,
} from '../models/Notification'
import { addNotification } from '../actions/notifications/NotificationActions'

interface IProps {
  addNotification: (notification: INotification) => void
}

class SigninPage extends React.Component<IProps> {
  static async getInitialProps({ req }) {
    return { isSignedIn: await isSignedIn(req) }
  }

  private handleSubmit = async ({ login, password }) => {
    try {
      await AuthApi.signIn(login, password)
    } catch (error) {
      if (error.errors) {
        const notification = createNotification(
          NotificationSeverity.ERROR,
          'Failed to sign in.',
          5000
        )
        this.props.addNotification(notification)
        console.log('Should add notification')

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

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    addNotification: bindActionCreators(addNotification, dispatch),
  }
}

export default withRedux(store, undefined, mapDispatchToProps)(SigninPage)
