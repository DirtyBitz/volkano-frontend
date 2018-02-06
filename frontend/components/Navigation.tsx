import * as React from "react"
import Link from "next/link"

interface Props {
  userData?: {
    username: string
  }
}

export default class Navigation extends React.Component<Props> {
  render() {
    return (
      <nav>
        <Link href="/"><a>Home</a></Link>
        {!this.props.userData && <Link href="/signin"><a>Sign in</a></Link>}
        {this.props.userData && <Link href="/profile"><a>{this.props.userData.username}</a></Link>}
      </nav>
    )
  }
}