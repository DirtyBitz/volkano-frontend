import * as React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

const welcome = props => {
  return (
    <Layout>
      <h1>Account activated</h1>
      <p>
        Welcome to Volka.no, you can now{' '}
        <Link href="/signin">
          <a>sign in</a>
        </Link>{' '}
        to start your collection!
      </p>
    </Layout>
  )
}

export default welcome
