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
  isSignedIn: boolean
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

  render() {
    const { addTag, removeTag, clearTags, collection, isSignedIn } = this.props
    const showFiltered = collection.tags.length > 0
    return (
      <Layout title="Collection">
        <div id="search-bar">
          {isSignedIn && (
            <SearchBar
              addTag={addTag}
              removeTag={removeTag}
              clearTags={clearTags}
              tags={collection.tags}
            />
          )}
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
        <div id="add-item">
          <button>+</button>
        </div>

        <Modal
          isOpen={this.state.selectedItem ? true : false}
          onRequestClose={this.unselectItem}
          className="modal"
          overlayClassName="modal-overlay">
          <ItemModal item={this.state.selectedItem} onClose={this.unselectItem} />
        </Modal>

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
            right: 15px;
            bottom: 15px;
            padding: 10px;

            button {
              width: 75px;
              height: 75px;
              font-family: 'Roboto', sans-serif;
              font-size: 4em;
              text-transform: uppercase;
              letter-spacing: 2.5px;
              font-weight: 500;
              color: #000;
              background-color: #ffffff;
              border: none;
              border-radius: 45px;
              box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease 0s;
              cursor: pointer;
              outline: none;
            }

            button:hover {
              background-color: #2ee59d;
              box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
              color: #fff;
              transform: translateY(-7px);
            }
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
