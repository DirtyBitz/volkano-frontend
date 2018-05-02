import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { getSession } from '../utils/Session'
import { withAuth } from '../utils/withAuth'
import withSentry from '../utils/withSentry'
import { isSignedIn } from '../utils/Auth'

class ProfilePage extends React.Component<{ req; isSignedIn }, {}> {
  static async getInitialProps({ req }) {
    return { isSignedIn: await isSignedIn(req) }
  }

  render() {
    const session = getSession()
    return (
      <Layout title="Profile" {...this.props}>
        <Profile session={session} />
      </Layout>
    )
  }
}

const AuthProfilePage = withAuth(ProfilePage)
const SentryProfilePage = withSentry(AuthProfilePage)
export default withRedux(store)(SentryProfilePage)
