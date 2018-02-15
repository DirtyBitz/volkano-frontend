import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { IStoreState } from '../store/StoreState'
import Layout from '../components/Layout'

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <Layout title="Volkano">
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
