import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { IStoreState } from '../store/StoreState'
import { ISignOutAction } from '../actions/authentication/AuthActionTypes'
import Layout from '../components/Layout'

interface AppProps extends IStoreState {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
}

export class App extends React.Component<AppProps, {}> {
  render() {
    const { authentication } = this.props

    return (
      <Layout title="Volkano" userData={authentication.user}>
        <div>Welcome to Volka.no</div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authentication: state.authentication,
  }
}

export default withRedux(store, mapStateToProps)(App)
