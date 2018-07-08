import App, { Container } from 'next/app'
import * as React from 'react'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import withReduxStore from '../utils/withReduxStore'
import withSentry from '../utils/withSentry'

class MyApp extends App {
  props: any

  render() {
    const { Component, pageProps, reduxStore, router } = this.props
    pageProps.url = router
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default compose(withSentry, withReduxStore)(MyApp)
