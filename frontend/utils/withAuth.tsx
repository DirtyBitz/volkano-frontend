import * as React from 'react'
import Router from 'next/router'
import { isSignedIn } from './Auth'
import { BeatLoader } from 'react-spinners'
import { Layout } from '../components/Layout'

interface IProps {
  isSignedIn: boolean
}

export function withAuth(WrappedComponent) {
  return class extends React.Component<IProps> {
    static async getInitialProps({ req }) {
      return { isSignedIn: isSignedIn(req) }
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
                textAlign: 'center',
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
