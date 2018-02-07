import * as React from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import { IUserJson } from 'models/User'

interface Props {
  userData?: IUserJson
  title?: string
}

class Layout extends React.Component<Props, any> {
  render() {
    const { userData, title, children } = this.props

    return (
      <div>
        <Head>
          <title>{title || 'Volkano'}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
          <Navigation userData={userData} />
        </header>
        {children}
        <Footer />
      </div>
    )
  }
}
export default Layout
