import * as React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import CreateItemForm from '../components/ItemForm'
import { Dispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { createItem } from '../actions/item/ItemActions'
import { SubmissionError } from 'redux-form'

// Move this interface and reuse it in actions
interface INewItem {
  title: string
  url: string
  tags: string
}

interface IProps extends IStoreState {
  url: any
  createItem: (item: INewItem) => (dispatch: any) => Promise<void>
}

class CreateItemPage extends React.Component<IProps> {
  private handleSubmit = async (item: INewItem) => {
    try {
      await this.props.createItem(item)
      Router.push('/')
    } catch (error) {
      throw new SubmissionError(error.errors)
    }
  }

  render() {
    const query = this.props.url ? this.props.url.query : undefined
    return (
      <Layout title="Add item">
        <h1
          style={{
            textAlign: 'center',
            padding: '10px',
            paddingTop: '60px',
          }}>
          Collect an image
        </h1>
        <CreateItemForm onSubmit={this.handleSubmit} {...query} />
      </Layout>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    collection: state.collection,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    createItem: bindActionCreators(createItem, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemPage)
