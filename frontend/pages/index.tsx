import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'react-redux'
import { IStoreState } from '../store/StoreState'
import { ISignOutAction } from '../actions/authentication/AuthActionTypes'
import { signIn, signOut } from '../actions/authentication/AuthActions'
import Layout from '../components/Layout'

interface AppProps extends IStoreState {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
}

export class App extends React.Component<AppProps, {}> {
  private renderSignOut() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.signOut()
          }}>
          Sign out!
        </button>
      </div>
    )
  }
  private renderAnonymous() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.signIn('test', 'test')
          }}>
          Sign in!
        </button>
      </div>
    )
  }

  render() {
    const { authentication } = this.props

    return (
      <Layout title="Homepage" userData={authentication.user}>
        {!authentication.user && this.renderAnonymous()}
        {authentication.user && this.renderSignOut()}
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

export default withRedux(store, mapStateToProps, mapDispatchToProps)(App)
