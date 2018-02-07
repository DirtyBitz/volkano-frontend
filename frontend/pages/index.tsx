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
  private renderSignedIn() {
    return <div>You just fake signed in! Auth with backend needs implementation.</div>
  }

  private renderAnonymous() {
    return (
      <Layout title="Homepage">
        <div>
          <button
            onClick={() => {
              this.props.signIn('test', 'test')
            }}>
            Sign in!
          </button>
        </div>
      </Layout>
    )
  }

  render() {
    const { authentication } = this.props
    return authentication.user ? this.renderSignedIn() : this.renderAnonymous()
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
