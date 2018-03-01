import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import Layout from '../components/Layout'
import { allItems, addTag, removeTag, clearTags } from '../actions/item/ItemActions'
import { CollectionStateI } from '../reducers/collectionReducer'
import ItemCard from '../components/ItemCard'
import { SearchBar, ITag } from '../components/SearchBar'
interface IProps extends IStoreState {
  allItems: (token: string, client: string, uid: string) => Promise<void>
  addTag: (tag: ITag) => void
  removeTag: (tag: ITag) => void
  clearTags: () => void
  collection: CollectionStateI
}
class CollectionPage extends React.Component<IProps> {
  componentDidMount() {
    const { token, client, uid } = this.props.authentication
    this.props.allItems(token, client, uid)
  }

  render() {
    const { addTag, removeTag, clearTags, collection } = this.props
    const hasFilteredItems = collection.filteredItems.length > 0

    return (
      <Layout title="Collection">
        <div id="search-bar">
          <SearchBar
            addTag={addTag}
            removeTag={removeTag}
            clearTags={clearTags}
            tags={collection.tags}
          />
        </div>
        <div id="collage">
          {hasFilteredItems &&
            collection.filteredItems.map(item => <ItemCard key={item.id} item={item} />)}

          {!hasFilteredItems &&
            collection.items &&
            collection.items.map(item => <ItemCard key={item.id} item={item} />)}
          <style jsx>{`
            #collage {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              margin-right: -15px;
            }
          `}</style>
        </div>
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
    allItems: bindActionCreators(allItems, dispatch),
    addTag: bindActionCreators(addTag, dispatch),
    removeTag: bindActionCreators(removeTag, dispatch),
    clearTag: bindActionCreators(clearTags, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(CollectionPage)
