import * as React from 'react'
import Link from 'next/link'
import { IUser } from '../models/User'
import { VolkaButton } from './VolkaButton'
import {
  faUser,
  faSignOutAlt,
  faBars,
  faTimes,
} from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { signOut } from '../utils/Auth'
import { Button } from 'semantic-ui-react'
interface Props {
  isSignedIn: boolean
  user?: IUser
  handleDropDownState: () => void
}

interface IState {
  showBurger: boolean
}

export default class Navigation extends React.Component<Props, IState> {
  constructor(props) {
    super(props)
    this.state = {
      showBurger: false,
    }
  }
  render() {
    const { isSignedIn, user, handleDropDownState } = this.props
    const { showBurger } = this.state
    return (
      <nav>
        <div id="main-nav">
          <Link href="/">
            <a id="home-link">
              Vol<span>kano</span>
            </a>
          </Link>
        </div>
        <div id="user-nav">
          {!isSignedIn && (
            <div>
              <Link href="/signin">
                <Button id="signin-link" basic color="olive">
                  Sign in
                </Button>
              </Link>

              <Link href="/signup">
                <Button id="signup-link" basic color="olive">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
          <div id="user-nav">
            <div>
              <a
                id="burger-nav"
                onClick={() => {
                  this.setState({ showBurger: !this.state.showBurger })
                  handleDropDownState()
                }}>
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={showBurger ? faTimes : faBars}
                  color="#fff"
                />
              </a>
            </div>
            {isSignedIn &&
              user && (
                <Link href="/profile">
                  <a id="profile-link">
                    <VolkaButton icon={faUser} title={user.nickname || user.email} />
                  </a>
                </Link>
              )}
            {isSignedIn &&
              user && (
                <a id="signout">
                  <VolkaButton icon={faSignOutAlt} onClick={signOut} className="danger" />
                </a>
              )}
          </div>
        </div>

        <style jsx>{`
          nav {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            align-items: center;

            #main-nav,
            #user-nav {
              a {
                color: #fff;
                text-decoration: none;
              }
            }
            #main-nav {
              a {
                padding-right: 15px;
              }
            }

            #user-nav {
              div {
                display: flex;
              }
            }
            #burger-nav {
              font-size: 25px;
              display: none;
              user-select: none;
            }
          }

          #home-link {
            font-size: 1.2em;
            span {
              color: #ce1a1a;
            }
          }

          a {
            opacity: 0.9;
          }

          a:hover {
            opacity: 1;
          }

          #signin-link,
          #signup-link,
          #profile-link,
          #signout {
            margin-left: 15px;
          }
          @media only screen and (max-width: 550px) {
            #signin-link,
            #signup-link,
            #profile-link,
            #signout {
              display: none;
            }
            #burger-nav {
              display: block !important;
              font-size: 25px;
            }
          }
        `}</style>
      </nav>
    )
  }
}
