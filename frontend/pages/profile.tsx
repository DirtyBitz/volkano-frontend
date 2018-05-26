import * as React from 'react'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { getSession } from '../utils/Session'
import { withAuth } from '../utils/withAuth'
import withSentry from '../utils/withSentry'
import { connect } from 'react-redux'

class ProfilePage extends React.Component<{ req; isSignedIn }, {}> {
  render() {
    const session = getSession()
    return (
      <Layout title="Profile">
        <Profile session={session} />
      </Layout>
    )
  }
}

const AuthProfilePage = withAuth(ProfilePage)
const SentryProfilePage = withSentry(AuthProfilePage)
export default connect()(SentryProfilePage)
