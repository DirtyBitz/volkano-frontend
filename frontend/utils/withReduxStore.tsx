import * as React from 'react'
import App from 'next/app'
import createStore from '../store'
import { IStoreState } from '../store/StoreState'
import { getReqSession } from './Auth'
import { addUser } from '../actions/user/UserActions'
import getConfig from 'next/config'
import Raven from 'raven-js'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState?: IStoreState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return createStore(initialState)
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

const withRedux = NextApp => {
  return class Redux extends React.Component {
    reduxStore: any

    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      const session = await getReqSession(appContext.ctx.req)
      console.log('Request with session', session)

      if (!!appContext.ctx.req && session) {
        reduxStore.dispatch(addUser(session))
      }

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await NextApp.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    /* istanbul ignore next: Do not need to test React internals */
    componentDidCatch(error, errorInfo) {
      Raven.captureException(error, { extra: errorInfo })
    }

    render() {
      return <NextApp {...this.props} reduxStore={this.reduxStore} />
    }
  }
}

export default withRedux
