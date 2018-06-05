import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from './Navigation'
import Footer from './Footer'
import getConfig from 'next/config'
import ReactGA from 'react-ga'
import { signOut } from '../utils/Auth'
import Notifications from '../components/Notifications'
import { Button } from 'semantic-ui-react'
import { connect, Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { IUserState } from '../reducers/user'
import { removeUser } from '../actions/user/UserActions'

interface IExternalProps {
  title?: string
  user?: IUserState
  noPadding?: boolean
}

interface IInternalProps {
  removeUser: () => void
}

interface IState {
  dropDownOpen: boolean
}

export class Layout extends React.Component<IExternalProps & IInternalProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      dropDownOpen: false,
    }
  }

  async componentDidMount() {
    this.googleAnalytics()
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

  /* istanbul ignore next - singOut and removeUser allready tested */
  private handleSignOut = () => {
    signOut()
    this.props.removeUser()
  }

  render() {
    const { title, children, user, noPadding } = this.props
    const { dropDownOpen } = this.state
    const signedInUser = user && user.session ? user.session.user : undefined

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
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
        </Head>
        <header>
          <Navigation
            user={signedInUser}
            handleDropDownState={this.handleDropDownState}
            onSignOut={this.handleSignOut}
          />
        </header>

        <Notifications />

        {dropDownOpen &&
          signedInUser && (
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
                {user.session.user.nickname || user.session.user.email}
                <div style={{ paddingTop: '5px' }}>
                  <Button
                    basic
                    color="olive"
                    onClick={this.handleSignOut}
                    className="danger">
                    Sign Out
                  </Button>
                </div>
              </a>
            </div>
          )}
        {dropDownOpen &&
          !signedInUser && (
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
            margin-top: 55px;
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
                margin-top: 55px;
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
            margin-top: 63px;
            flex: 1;
            padding: ${noPadding ? '0' : '30px'};
          }
          @media only screen and (min-width: 551px) {
            .dropdown-menu {
              display: none;
            }
          }
        `}</style>

        <style jsx global>{`
          body,
          html,
          #__next {
            margin: 0;
            height: 100%;
            background: #f9f9f9;
          }
        `}</style>
      </div>
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = (state: IStoreState) => ({
  user: state.user,
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
  removeUser: bindActionCreators(removeUser, dispatch),
})

export default connect<void, void, IExternalProps>(mapStateToProps, mapDispatchToProps)(
  Layout
)
