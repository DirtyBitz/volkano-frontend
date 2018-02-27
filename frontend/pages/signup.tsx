import { bindActionCreators } from 'redux'
import { createUser } from '../actions/authentication/AuthActions'
import { IUserRegisterDetails } from '../api/AuthApi'
import * as React from 'react'
import { IStoreState } from '../store/StoreState'
import store from '../store'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'
import * as withRedux from 'next-redux-wrapper'
import { Dispatch } from 'react-redux'
import Router from 'next/router'

interface IProps extends IStoreState {
  createUser: (userDetails: IUserRegisterDetails) => Promise<void>
}

class SignUpPage extends React.Component<IProps> {
  private handleSubmit = ({ email, password, nickname }) => {
    this.props.createUser({ email, password, nickname })
  }

  componentDidUpdate() {
    if (this.props.authentication.user) {
      Router.push('/emailconfirmation')
    }
  }

  render() {
    const { authentication } = this.props
    return (
      <Layout title="Sign Up">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Create a user to start collecting!
        </h1>
        {authentication.errors &&
          authentication.errors.map((error, i) => (
            <div
              key={i}
              style={{
                color: 'red',
                textAlign: 'center',
                height: '30px',
                whiteSpace: 'nowrap',
              }}>
              {error}
            </div>
          ))}
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
