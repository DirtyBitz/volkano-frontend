import * as React from 'react'
import Link from 'next/link'
import { IUserJson } from 'models/User'

interface Props {
  userData?: IUserJson
}

export default class Navigation extends React.Component<Props> {
  render() {
    const { userData } = this.props
    return (
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        {!userData && (
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        )}
        {userData && (
          <Link href="/profile">
            <a>{this.props.userData.email}</a>
          </Link>
        )}
      </nav>
    )
  }
}
