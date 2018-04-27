import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import Layout from '../components/Layout'
import Welcome from '../components/Welcome'
import Collection from '../components/Collection'
import { isSignedIn } from '../utils/Auth'
export class App extends React.Component<{ req; isSignedIn }, {}> {
  static async getInitialProps({ req }) {
    return { isSignedIn: await isSignedIn(req) }
  }

  render() {
    const { isSignedIn } = this.props
    return <Layout>{isSignedIn ? <Collection /> : <Welcome />}</Layout>
  }
}

export default withRedux(store)(App)
