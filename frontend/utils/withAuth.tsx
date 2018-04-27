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
    /* istanbul ignore next: Do not need to test React internals */
    static async getInitialProps(context) {
      const { req } = context
      if (WrappedComponent.getInitialProps) {
        const childProps = WrappedComponent.getInitialProps(context)
        return { isSignedIn: await isSignedIn(req), ...childProps }
      }
      return { isSignedIn: await isSignedIn(req) }
    }

    componentDidMount() {
      if (!this.props.isSignedIn) {
        Router.push('/signin')
      }
    }

    render() {
      if (!this.props.isSignedIn)
        return (
          <Layout {...this.props}>
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
