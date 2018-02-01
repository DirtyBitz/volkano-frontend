import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'react-redux'
import StoreState from '../store/StoreState'
import { ISignInAction, ISignOutAction } from '../actions/authentication/AuthActionTypes'
import { signIn, signOut } from '../actions/authentication/AuthActions'

interface AppProps extends StoreState {
  signIn: (username: string, password: string) => ISignInAction
  signOut: () => ISignOutAction
}

export class App extends React.Component<AppProps, {}> {
  private renderSignedIn() {
    return <div>You just fake signed in! Auth with backend needs implementation.</div>
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
    return authentication.isAuthenticated ? this.renderSignedIn() : this.renderAnonymous()
  }
}

const mapStateToProps = (state: StoreState, ownProps = {}) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signOut: bindActionCreators(signOut, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(App)
