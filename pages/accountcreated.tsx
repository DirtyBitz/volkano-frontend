import * as React from 'react'
import Layout from '../components/Layout'
import getConfig from 'next/config'
import { connect } from 'react-redux'

const redirect = props => {
  const {
    publicRuntimeConfig: { ENV },
  } = getConfig()

  return (
    <Layout title="Account created">
      <h1
        style={{
          textAlign: 'center',
          padding: '10px',
          paddingTop: '60px',
        }}>
        Account created
      </h1>

      <p>
        An account has been created and a confirmation email has been sent your email
        address.
      </p>
      {ENV === 'development' && (
        <a href="http://localhost:1080">
          In development you can confirm your account here.
        </a>
      )}
    </Layout>
  )
}

export default connect()(redirect)
