import * as React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import CreateItemForm from '../components/ItemForm'
import { Dispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { createItem } from '../actions/item/ItemActions'
import { SubmissionError } from 'redux-form'
import { withAuth } from '../utils/withAuth'
import { addNotification } from '../actions/notifications/NotificationActions'
import { IAddNotification } from '../actions/notifications/NotificationActionTypes'
import {
  INotification,
  createNotification,
  NotificationSeverity,
} from '../models/Notification'

// Move this interface and reuse it in actions
interface INewItem {
  title: string
  url: string
  tags: string
}

interface IProps extends IStoreState {
  url: any
  createItem: (item: INewItem) => (dispatch: any) => Promise<void>
  addNotification: (notification: INotification) => IAddNotification
}

class CreateItemPage extends React.Component<IProps> {
  private handleSubmit = async (item: INewItem) => {
    try {
      await this.props.createItem(item)
      const notification = createNotification(
        NotificationSeverity.SUCCESS,
        `Successfully added ${item.title} to your collection.`,
        5000
      )
      this.props.addNotification(notification)
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
          }}>
          Collect an image
        </h1>
        <CreateItemForm onSubmit={this.handleSubmit} initialValues={query} />
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
    addNotification: bindActionCreators(addNotification, dispatch),
  }
}

const composedCreateItemPage = withAuth(CreateItemPage)

export default connect(mapStateToProps, mapDispatchToProps)(composedCreateItemPage)
