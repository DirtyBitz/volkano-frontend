import * as React from 'react'
import Link from 'next/link'
import { signOut } from '../utils/Auth'
import { Button, Icon } from 'semantic-ui-react'
import { IUser } from '../models/User'
interface Props {
  user?: IUser
  handleDropDownState: () => void
  onSignOut: () => void
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
    const { user, handleDropDownState, onSignOut } = this.props
    const isSignedIn = !!user
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
                <a id="signin-link">
                  <Button basic color="olive">
                    Sign in
                  </Button>
                </a>
              </Link>

              <Link href="/signup">
                <a id="signup-link">
                  <Button basic color="olive">
                    Sign up
                  </Button>
                </a>
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
                <Icon name="bars" />
              </a>
            </div>
            {isSignedIn &&
              user && (
                <Link href="/profile">
                  <a id="profile-link">
                    <Button icon basic color="orange">
                      <Icon name="user" />
                      {user.name || user.email}
                    </Button>
                  </a>
                </Link>
              )}
            {isSignedIn &&
              user && (
                <a id="signout">
                  <Button icon basic color="red" onClick={onSignOut}>
                    <Icon name="sign out" />
                    Sign out
                  </Button>
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
