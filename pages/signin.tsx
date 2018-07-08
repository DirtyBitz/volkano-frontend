import * as React from 'react'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import SigninForm from '../components/SigninForm'
import Layout from '../components/Layout'
import AuthApi from '../api/AuthApi'
import { SubmissionError } from 'redux-form'
import { getSession, ISession } from '../utils/Session'
import { Dispatch, connect } from 'react-redux'
import { IStoreState } from '../store/StoreState'
import {
  INotification,
  createNotification,
  NotificationSeverity,
} from '../models/Notification'
import { addNotification } from '../actions/notifications/NotificationActions'
import { IAddNotification } from '../actions/notifications/NotificationActionTypes'
import { addUser } from '../actions/user/UserActions'
import { IAddUserAction } from '../actions/user/UserActionTypes'

interface IProps {
  url?: any
  session?: ISession
  addNotification: (notification: INotification) => IAddNotification
  addUser: (session: ISession) => IAddUserAction
}

class SigninPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    if (props.session) Router.push('/', '/')
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
        throw new SubmissionError({ login: error.errors.join('\n') })
      }
    }

    const session = getSession()

    this.props.addUser(session)
    Router.push('/', '/')
  }

  render() {
    const query = this.props.url ? this.props.url.query : undefined
    return (
      <Layout title="Sign In">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Sign in
        </h1>
        <SigninForm onSubmit={this.handleSubmit} initialValues={query} />
      </Layout>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    session: state.user.session,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    addNotification: bindActionCreators(addNotification, dispatch),
    addUser: bindActionCreators(addUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage)
