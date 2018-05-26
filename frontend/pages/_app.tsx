import App, { Container } from 'next/app'
import * as React from 'react'
import { Provider } from 'react-redux'
import withReduxStore from '../utils/withReduxStore'

class MyApp extends App {
  props: any

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
