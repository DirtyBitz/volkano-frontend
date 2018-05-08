import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from './Navigation'
import Footer from './Footer'
import { getSession, ISession } from '../utils/Session'
import getConfig from 'next/config'
import ReactGA from 'react-ga'
import { VolkaButton } from './VolkaButton'
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { signOut, isSignedIn } from '../utils/Auth'
import withSentry from '../utils/withSentry'
import Notifications from '../components/Notifications'

interface IProps {
  title?: string
  isSignedIn: boolean
}

interface IState {
  session: ISession
  dropDownOpen: boolean
}

export class Layout extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      session: null,
      dropDownOpen: false,
    }
  }

  async componentDidMount() {
    this.googleAnalytics()

    const session = getSession()
    const signedIn = await isSignedIn(session)
    if (signedIn) {
      this.setState({
        session,
      })
    } else {
      this.setState({
        session: undefined,
      })
    }
  }

  /* istanbul ignore next */
  handleDropDownState = () => {
    this.setState({ dropDownOpen: !this.state.dropDownOpen })
  }

  private googleAnalytics() {
    const config = getConfig()
    /* istanbul ignore next */
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
    const { title, children } = this.props
    const { dropDownOpen, session } = this.state
    /* istanbul ignore next: TODO: conditionals should be split into components */
    return (
      <div className="page">
        <Head>
          <title>{title ? `${title} | Volkano` : 'Volkano'}</title>
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
        <header>
          <Navigation
            isSignedIn={this.props.isSignedIn}
            user={session && session.user}
            handleDropDownState={this.handleDropDownState}
          />
        </header>

        <Notifications />

        {dropDownOpen &&
          session && (
            <div className="dropdown-menu">
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
              <Link href="/additem">
                <a>Add new item</a>
              </Link>
              <a>
                {session.user.nickname || session.user.email}
                <div style={{ paddingTop: '5px' }}>
                  <VolkaButton
                    icon={faSignOutAlt}
                    onClick={signOut}
                    title={'Sign Out'}
                    className="danger"
                  />
                </div>
              </a>
            </div>
          )}
        {dropDownOpen &&
          !session && (
            <div className="dropdown-menu">
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </div>
          )}
        <div className="main">{children}</div>
        <Footer />

        <style jsx>{`
          .dropdown-menu {
            width: 100%;
            background: #44474c;
            margin-top: 60px;
            position: fixed;
            animation-name: dropdown-animation;
            animation-duration: 0.5s;
            z-index: 1;
            a {
              display: block;
              padding: 12px;
              border-top: 1px solid #383a3d;
              text-align: center;
              text-decoration: none;
              color: white;
            }
            @keyframes dropdown-animation {
              from {
                margin-top: -100px;
              }
              to {
                margin-top: 60px;
              }
            }
          }
          .page {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          header {
            background: #1c222a;
            color: #fff;
            z-index: 3;
            max-heigth: 63px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
          }

          .main {
            flex: 1;
          }
          @media only screen and (min-width: 551px) {
            .dropdown-menu {
              display: none;
            }
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

export default withSentry(Layout)
