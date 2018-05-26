import App, { Container } from 'next/app'
import * as React from 'react'
import createStore from '../store'
import { IStoreState } from '../store/StoreState'
import { Provider } from 'react-redux'
import { getReqSession } from '../utils/Auth'
import { addUser } from '../actions/user/UserActions'

class MyApp extends App {
  reduxStore: any

  static async getInitialProps(appContext) {
    /**
     * Initialize redux store and make it available in the app ctx,
     * makes it avaiable to all other pages in getInitialProps.
     */
    const reduxStore = createOrGetReduxStore()
    const session = await getReqSession(appContext.ctx.req)

    appContext.ctx.reduxStore = reduxStore

    if (!!appContext.ctx.req && session) {
      reduxStore.dispatch(addUser(session))
    }

    let appProps = {}
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(appContext)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    }
  }

  /*
   * Constructor is ran after all getInitalProps on
   * every page is finished running. This means that
   * the redux store has been populated and we gets its that
   * from the app props and can create it in that state for
   * the client so they are in sync.
   */
  constructor(props) {
    super(props)
    this.reduxStore = createOrGetReduxStore(props.initialReduxState)
  }

  render() {
    // @ts-ignore - No props interface options for App component
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

/**
 * Creates a clean redux store on server side.
 * Creates or gets the client side store if allready present.
 */

function createOrGetReduxStore(initialState?: IStoreState) {
  const isServer = typeof window === 'undefined'
  const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

  if (isServer) {
    return createStore()
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default MyApp
