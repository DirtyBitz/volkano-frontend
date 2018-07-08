import * as React from 'react'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { withAuth } from '../utils/withAuth'
import { compose } from 'redux'

const ProfilePage = () => (
  <Layout title="Profile">
    <Profile />
  </Layout>
)

export default compose(withAuth)(ProfilePage)
