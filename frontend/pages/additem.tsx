import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import store from '../store'
import Layout from '../components/Layout'
import CreateItemForm from '../components/ItemForm'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { createItem } from '../actions/item/ItemActions'

// Move this interface and reuse it in actions
interface INewItem {
  title: string
  url: string
  tags: string
}

interface IProps extends IStoreState {
  createItem: (
    token: string,
    client: string,
    uid: string,
    item: INewItem
  ) => Promise<void>
}

class CreateItemPage extends React.Component<IProps> {
  private handleSubmit = async (item: INewItem) => {
    const { token, client, uid } = this.props.authentication
    await this.props.createItem(token, client, uid, item)
  }

  componentWillReceiveProps(props) {
    if (!props.authentication.user) {
      Router.push('/signin')
    }
  }

  render() {
    return (
      <Layout title="Add item">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
          }}>
          Collect an image
        </h1>
        <CreateItemForm onSubmit={this.handleSubmit} />
      </Layout>
    )
  }
}
const mapStateToProps = (state: IStoreState) => {
  return {
    collection: state.collection,
    authentication: state.authentication,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    createItem: bindActionCreators(createItem, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(CreateItemPage)
