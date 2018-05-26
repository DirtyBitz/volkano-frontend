import React from 'react'
import Layout from '../components/Layout'
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

    return <Layout>{user && user.session ? <Collection /> : <Welcome />}</Layout>
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Frontpage)
