import * as React from 'react'
import App from 'next/app'
import createStore from '../store'
import { IStoreState } from '../store/StoreState'
import { getReqSession } from './Auth'
import { addUser } from '../actions/user/UserActions'

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

export default NextApp => {
  return class Redux extends React.Component {
    reduxStore: any

    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      const session = await getReqSession(appContext.ctx.req)

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

    render() {
      return <NextApp {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
