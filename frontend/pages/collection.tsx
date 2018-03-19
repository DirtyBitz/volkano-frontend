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
import { Item } from '../models/Item'
import Modal from 'react-modal'
import { ItemModal } from '../components/ItemModal'
import { withAuth } from '../utils/withAuth'

interface IProps extends IStoreState {
  allItems: Function
  addTag: (tag: ITag) => void
  removeTag: (tag: ITag) => void
  clearTags: () => void
  collection: CollectionStateI
}

interface IState {
  selectedItem?: Item
}
class CollectionPage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: undefined,
    }
  }
  componentDidMount() {
    this.props.allItems()
  }

  private onItemSelect = (item: Item) => {
    this.setState({
      selectedItem: item,
    })
  }

  private unselectItem = () => {
    this.setState({
      selectedItem: undefined,
    })
  }

  private onKeyEvent = keyevent => {
    const { items, filteredItems } = this.props.collection
    const collection = filteredItems.length ? filteredItems : items

    const index = collection.findIndex(item => {
      return this.state.selectedItem === item
    })
    keyevent === 'ArrowRight'
      ? this.setState({ selectedItem: collection[index + 1] })
      : this.setState({ selectedItem: collection[index - 1] })
  }

  private keyHandler = e => {
    if (e.key === 'ArrowRight') {
      this.onKeyEvent('ArrowRight')
    } else if (e.key === 'ArrowLeft') {
      this.onKeyEvent('ArrowLeft')
    }
  }

  render() {
    const { addTag, removeTag, clearTags, collection } = this.props
    const showFiltered = collection.tags.length > 0
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
          {showFiltered &&
            collection.filteredItems.map(item => (
              <ItemCard key={item.id} item={item} onSelect={this.onItemSelect} />
            ))}

          {!showFiltered &&
            collection.items &&
            collection.items.map(item => (
              <ItemCard key={item.id} item={item} onSelect={this.onItemSelect} />
            ))}
        </div>

        <div id="add-item" onClick={() => console.log('Should open modal to add item')}>
          <span>+</span>
        </div>

        <div onKeyDown={this.keyHandler}>
          <Modal
            isOpen={this.state.selectedItem ? true : false}
            onRequestClose={this.unselectItem}
            className="modal"
            overlayClassName="modal-overlay">
            <ItemModal
              item={this.state.selectedItem}
              onClose={this.unselectItem}
              onNext={() => this.onKeyEvent('ArrowRight')}
              onPrev={() => this.onKeyEvent('ArrowLeft')}
            />
          </Modal>
        </div>

        <style jsx global>{`
          .modal {
            display: block;
            background: white;
            border-radius: 10px;
            outline: none;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          .modal-overlay {
            position: fixed;
            top: 0px;
            left: 0;
            right: 0;
            bottom: 0px;
            background: transparent;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
          }
        `}</style>

        <style jsx>{`
          #search-bar {
            margin-bottom: 10px;
          }
          #add-item {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: space-around;
            right: 30px;
            bottom: 30px;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
            width: 60px;
            height: 60px;
            font-size: 4em;
            border-radius: 30px;
            transition: all 0.2s;
          }

          #add-item:hover {
            background-color: #2ee59d;
            box-shadow: 0px 10px 10px rgba(46, 229, 157, 0.4);
            color: #fff;
            transform: translateY(-2px);
            cursor: pointer;
          }

          #collage {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-right: -15px;
          }
        `}</style>
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

const AuthCollectionPage = withAuth(CollectionPage)

export default withRedux(store, mapStateToProps, mapDispatchToProps)(AuthCollectionPage)
