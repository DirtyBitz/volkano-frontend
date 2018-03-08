import * as React from 'react'
import Router from 'next/router'
import { getSession } from './Session'

interface IProps {
  isSignedIn: boolean
}

export function withAuth(WrappedComponent) {
  return class extends React.Component<IProps> {
    constructor(props) {
      super(props)
    }

    static async getInitialProps({ req }) {
      if (req) {
        const cookies = req.headers.cookie
        if (!cookies) return { isSignedIn: false }
        return { isSignedIn: true }
      } else {
        const session = getSession()
        if (session) return { isSignedIn: session ? true : false }
      }
    }
    componentDidMount() {
      if (!this.props.isSignedIn) {
        Router.push('/signin')
      }
    }

    render() {
      if (!this.props.isSignedIn) return null
      return <WrappedComponent {...this.props} />
    }
  }
}
