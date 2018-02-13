import * as React from 'react'
import Link from 'next/link'
import { User } from '../models/User'
interface Props {
  userData?: User
}

export default class Navigation extends React.Component<Props> {
  render() {
    const { userData } = this.props
    return (
      <nav>
        <div className="main-nav">
          <Link href="/">
            <a id="home-link">Home</a>
          </Link>
        </div>
        <div className="user-nav">
          {!userData && (
            <div>
              <Link href="/signin">
                <a id="signin-link">Sign in</a>
              </Link>

              <Link href="/signup">
                <a id="signup-link">Sign up</a>
              </Link>
            </div>
          )}
          {userData && (
            <Link href="/profile">
              <a id="profile-link">{this.props.userData.email}</a>
            </Link>
          )}
        </div>

        <style jsx>{`
          nav {
            padding: 15px;
            display: flex;
            justify-content: space-between;
          }

          nav a {
            color: #fff;
            text-decoration: none;
          }

          nav a:hover {
            color: pink;
          }
        `}</style>
      </nav>
    )
  }
}
