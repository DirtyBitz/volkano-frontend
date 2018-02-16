import * as React from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import { connect } from 'react-redux'
import { IStoreState } from '../store/StoreState'
import { AuthStateI } from '../reducers/authenticationReducer'

interface Props {
  title?: string
  authentication?: AuthStateI
}

export class Layout extends React.Component<Props, any> {
  render() {
    const { authentication, title, children } = this.props

    return (
      <div className="page">
        <Head>
          <title>{title || 'Volkano'}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
          <Navigation
            isSignedIn={authentication && authentication.token ? true : false}
            user={authentication && authentication.user}
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
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authentication: state.authentication,
  }
}

export default connect(mapStateToProps, undefined)(Layout)
