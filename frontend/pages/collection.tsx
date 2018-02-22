import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { Layout } from '../components/Layout'
import { allItems } from '../actions/item/ItemActions'
import { CollectionStateI } from '../reducers/collectionReducer'

interface IProps extends IStoreState {
  allItems: () => Promise<void>
  collection: CollectionStateI
}
class CollectionPage extends React.Component<IProps> {
  async componentWillMount() {
    await this.props.allItems()
  }

  render() {
    const { items } = this.props.collection

    return (
      <Layout title="Collection">
        {items && items.map(it => <div key={it.id}>{it.title}</div>)}
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
    allItems: bindActionCreators(allItems, dispatch),
  }
}
export default withRedux(store, mapStateToProps, mapDispatchToProps)(CollectionPage)
