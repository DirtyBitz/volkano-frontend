import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import store from '../store'
import getConfig from 'next/config'

const redirect = props => {
  const { publicRuntimeConfig: { ENV } } = getConfig()
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

export default withRedux(store)(redirect)
