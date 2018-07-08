import * as React from 'react'
import Router from 'next/router'
import { Message, Icon, Container } from 'semantic-ui-react'
import Layout from '../components/Layout'

interface IProps {
  isSignedIn?: boolean
}

export function withAuth(WrappedComponent) {
  return class extends React.Component<IProps> {
    /* istanbul ignore next: Do not need to test React internals */
    static async getInitialProps(context) {
      const { reduxStore, req } = context

      let childProps = {}

      if (WrappedComponent.getInitialProps) {
        const compChildProps = WrappedComponent.getInitialProps(context)
        childProps = compChildProps
      }

      const store = reduxStore.getState()
      const isSignedIn = !!store.user.session

      if (!isSignedIn && !req) {
        Router.push('/signin')
      }

      return { ...childProps, isSignedIn }
    }

    componentDidMount() {
      if (!this.props.isSignedIn) {
        Router.push('/signin')
      }
    }

    render() {
      const { isSignedIn } = this.props
      if (!isSignedIn) {
        return (
          <Layout>
            <Container>
              <Message icon>
                <Icon name="circle notched" loading />
                <Message.Content>
                  <Message.Header>Redirecting</Message.Header>
                  You can't access this page.
                </Message.Content>
              </Message>
            </Container>
          </Layout>
        )
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
