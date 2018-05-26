import * as React from 'react'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { getSession } from '../utils/Session'
import { withAuth } from '../utils/withAuth'
import { connect } from 'react-redux'
import { compose } from 'redux'

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

const composedProfilePage = compose(withAuth)(ProfilePage)

export default connect()(composedProfilePage)
