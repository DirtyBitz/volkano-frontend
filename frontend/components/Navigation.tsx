import * as React from 'react'
import Link from 'next/link'
import { IUser } from '../models/User'
import { VolkaButton } from './VolkaButton'
import { faUser, faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { clearSession } from '../utils/Session'
import Router from 'next/router'
interface Props {
  isSignedIn: boolean
  user?: IUser
}

export default class Navigation extends React.Component<Props> {
  private signOut = () => {
    clearSession()
    Router.push('/')
  }

  render() {
    const { isSignedIn, user } = this.props
    return (
      <nav>
        <div id="main-nav">
          <Link href="/">
            <a id="home-link">
              Vol<span>kano</span>
            </a>
          </Link>
          {isSignedIn && (
            <Link href="/collection">
              <a id="collection-link">Collection</a>
            </Link>
          )}
        </div>
        <div id="user-nav">
          {!isSignedIn && (
            <div>
              <Link href="/signin">
                <a id="signin-link">
                  <VolkaButton title="Sign in" />
                </a>
              </Link>

              <Link href="/signup">
                <a id="signup-link">
                  <VolkaButton title="Sign up" />
                </a>
              </Link>
            </div>
          )}
          <div id="user-nav">
            {isSignedIn &&
              user && (
                <Link href="/profile">
                  <a id="profile-link">
                    <VolkaButton icon={faUser} />
                  </a>
                </Link>
              )}
            {isSignedIn &&
              user && (
                <a id="signout">
                  <VolkaButton
                    icon={faSignOutAlt}
                    onClick={this.signOut}
                    className={'danger'}
                  />
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
        `}</style>
      </nav>
    )
  }
}
