import * as React from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import { getSession, ISession } from '../utils/Session'

interface IProps {
  title?: string
}

interface IState {
  session: ISession
}

export class Layout extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      session: null,
    }
  }

  componentDidMount() {
    const session = getSession()
    if (session) {
      this.setState({
        session,
      })
    }
  }

  render() {
    const { title, children } = this.props

    return (
      <div className="page">
        <Head>
          <title>{title || 'Volkano'}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
          <Navigation
            isSignedIn={this.state.session ? true : false}
            user={this.state.session && this.state.session.user}
          />
        </header>
        <div className="main">{children}</div>
        <Footer />

        <style jsx>{`
          .page {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          header {
            background: #222;
            color: #fff;
          }

          .main {
            padding: 15px;
            flex: 1;
          }
        `}</style>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css?family=Montserrat');

          /* Mini css reset */
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body,
          html,
          #__next {
            margin: 0;
            height: 100%;
            font-family: 'Montserrat', sans-serif;
            background: #FFFEFE;
          }
        `}</style>
      </div>
    )
  }
}

export default Layout
