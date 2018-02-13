import { bindActionCreators } from 'redux'
import { createUser, clearAuthErrors } from '../actions/authentication/AuthActions'
import {
  ICreateUserPendingAction,
  ICreateUserFulfilledAction,
  ICreateUserRejectedAction,
  IClearAuthErrors,
} from '../actions/authentication/AuthActionTypes'
import * as React from 'react'
import { IStoreState } from '../store/StoreState'
import { store } from '../store'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'
import * as withRedux from 'next-redux-wrapper'
import { Dispatch } from 'react-redux'

interface IProps extends IStoreState {
  createUser: (username: string, password: string) => Promise<void>
}

class SignUpPage extends React.Component<IProps> {
  private handleSubmit = ({ username, password }) => {
    this.props.createUser(username, password)
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
        <h1>Create a user to start collecting!</h1>
        <SignUpForm onSubmit={this.handleSubmit} />
      </Layout>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    createUser: bindActionCreators(createUser, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(SignUpPage)
