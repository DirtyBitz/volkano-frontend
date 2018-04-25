import * as React from 'react'
import getConfig from 'next/config'
import Raven from 'raven-js'

interface IState {
  error: Error
}

export default function withSentry(WrappedComponent) {
  return class extends React.Component<{}, IState> {
    /* istanbul ignore next: Do not need to test React internals */
    static getInitialProps(context) {
      if (WrappedComponent.getInitialProps) {
        return WrappedComponent.getInitialProps(context)
      }
      return {}
    }

    constructor(props) {
      super(props)
      this.state = {
        error: null,
      }

      const { publicRuntimeConfig: { SENTRY_DSN } } = getConfig()

      Raven.config(SENTRY_DSN).install()
    }

    /* istanbul ignore next: Do not need to test React internals */
    componentDidCatch(error, errorInfo) {
      this.setState({ error })
      Raven.captureException(error, { extra: errorInfo })
    }

    render() {
      return <WrappedComponent {...this.props} error={this.state.error} />
    }
  }
}
