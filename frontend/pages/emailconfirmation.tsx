import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import store from '../store'

const redirect = props => {
  return (
    <Layout title="Ya gon get emails now">
      <h1>Account created</h1>
      <p>An account has been created and a confirmation email has been sent somewhere.</p>
      <a href="http://localhost:1080">Well well, confirm account here.</a>
    </Layout>
  )
}

export default withRedux(store)(redirect)
