import * as React from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import { getSession, ISession } from '../utils/Session'
import getConfig from 'next/config'
import ReactGA from 'react-ga'

interface IProps {
  title?: string
  fixedHeader?: boolean
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
    this.googleAnalytics()

    const session = getSession()
    if (session) {
      this.setState({
        session,
      })
    }
  }

  private googleAnalytics() {
    const config = getConfig()
    const prod =
      config &&
      config.publicRuntimeConfig &&
      config.publicRuntimeConfig.ENV === 'production'
    if (prod) {
      ReactGA.initialize('UA-116834335-1')
      ReactGA.pageview(document.location.pathname)
    }
  }

  render() {
    const { title, fixedHeader, children } = this.props

    return (
      <div className="page">
        <Head>
          <title>{title || 'Volkano'}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="static/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <header className={fixedHeader ? 'fixed-header' : ''}>
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
            background: #1c222a;
            color: #fff;
          }

          header.fixed-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: transparent;
          }

          .main {
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
            background: #f9f9f9;
          }

          input {
            font-family: 'Montserrat', sans-serif;
            font-size: 1em;
            outline: none;
          }
        `}</style>
      </div>
    )
  }
}

export default Layout
