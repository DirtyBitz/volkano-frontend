import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { bindActionCreators } from 'redux'
import { signIn, signOut } from '../actions/authentication/authenticationActions'
import { Dispatch } from 'react-redux'
import StoreState from '../store/StoreState'
import ISignOutAction from '../actions/authentication/ISignOutAction'
import ISignInAction from '../actions/authentication/ISignInAction'

interface Props extends StoreState {
  signIn: (username: string, password: string) => ISignInAction
  signOut: () => ISignOutAction
}

class App extends React.Component<Props, {}> {
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
    return this.props.isAuthenticated ? this.renderSignedIn() : this.renderAnonymous()
  }
}

const mapStateToProps = (state: StoreState, ownProps = {}) => {
  return {
    isAuthenticated: state.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signOut: bindActionCreators(signOut, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(App)
