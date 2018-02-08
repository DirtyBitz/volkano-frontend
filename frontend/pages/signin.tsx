import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import Form from '../components/SigninForm'
import Layout from '../components/Layout'

class SigninPage extends React.Component {
  private handleSumbit = () => {
    console.log('Did sumbit')
  }

  render() {
    return (
      <Layout>
        <Form onSubmit={this.handleSumbit} />
      </Layout>
    )
  }
}

export default withRedux(store, undefined, undefined)(SigninPage)
