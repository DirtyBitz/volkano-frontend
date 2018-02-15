import * as React from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import { User } from '../models/User'

interface Props {
  userData?: User
  title?: string
}

class Layout extends React.Component<Props, any> {
  render() {
    const { userData, title, children } = this.props

    return (
      <div className="page">
        <Head>
          <title>{title || 'Volkano'}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js" />
        </Head>
        <header>
          <Navigation userData={userData} />
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
          }
        `}</style>
      </div>
    )
  }
}
export default Layout
