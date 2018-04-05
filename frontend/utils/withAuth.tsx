import * as React from 'react'
import Router from 'next/router'
import { getSession } from './Session'
import { BeatLoader } from 'react-spinners'
import { Layout } from '../components/Layout'

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
        return {
          isSignedIn: cookies
            ? cookies.split(';').filter(cookie => cookie.includes('session')).length == 1
            : false,
        }
      } else {
        const session = getSession()
        return { isSignedIn: !!session }
      }
    }
    componentDidMount() {
      if (!this.props.isSignedIn) {
        Router.push('/signin')
      }
    }

    render() {
      if (!this.props.isSignedIn)
        return (
          <Layout>
            <div
              style={{
                'text-align': 'center',
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
              }}>
              <BeatLoader color="#444" size={20} />
            </div>
          </Layout>
        )
      return <WrappedComponent {...this.props} />
    }
  }
}
