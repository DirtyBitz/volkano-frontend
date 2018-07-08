import React from 'react'
import Welcome from '../components/Welcome'
import Collection from '../components/Collection'
import { connect } from 'react-redux'
import { IStoreState } from '../store/StoreState'
import { IUserState } from '../reducers/user'

interface IProps {
  user: IUserState
}

export class Frontpage extends React.Component<IProps, {}> {
  render() {
    const { user } = this.props

    if (user && user.session) {
      return <Collection />
    } else {
      return <Welcome />
    }
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Frontpage)
