import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { allItems, removeItem, setTags } from '../actions/item/ItemActions'
import { ICollectionState } from '../reducers/collection'
import ItemCard from './ItemCard'
import { Item } from '../models/Item'
import Modal from 'react-modal'
import { ItemModal } from './ItemModal'
import Link from 'next/link'
import { Grid, Dropdown } from 'semantic-ui-react'

export interface ITag {
  label: string
  value: any
}

interface IProps extends IStoreState {
  allItems: Function
  setTags: (tag: ITag[]) => void
  deleteItem: (item) => void
  collection: ICollectionState
}

interface IState {
  selectedItem?: Item
}

class Collection extends React.Component<IProps, IState> {
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

  private deleteItem = (item: Item) => {
    this.props.deleteItem(item)
    this.unselectItem()
  }

  render() {
    const { setTags, collection } = this.props
    const showFiltered = collection.tags.length > 0
    const items = showFiltered ? collection.filteredItems : collection.items
    const searchTags = (collection.items || []).map(item => {
      return [...item.categories, ...item.tags]
    })
    const catted = searchTags.reduce((prev, curr) => [...prev, ...curr], [])
    const tags = [...new Set(catted)].map(val => ({ value: val, key: val, text: val }))

    return (
      <div>
        <div id="search-bar">
          <Dropdown
            fluid
            multiple
            search
            selection
            options={tags}
            onChange={(event, data) => {
              const tags = data.value.map(val => ({ value: val, label: val }))
              setTags(tags)
            }}
          />
          {/* <SearchBar
            addTag={addTag}
            removeTag={removeTag}
            clearTags={clearTags}
            tags={collection.tags}
          /> */}
        </div>

        <Grid centered id="collage">
          {(items || []).map(item => (
            <ItemCard key={item.id} item={item} onSelect={this.onItemSelect} />
          ))}
        </Grid>

        {this.state.selectedItem
          ? false
          : true && (
              <div id="add-item">
                <Link href="/additem">
                  <span>+</span>
                </Link>
              </div>
            )}

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
              onDelete={this.deleteItem}
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
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
          }
        `}</style>

        <style jsx>{`
          #search-bar {
            margin-top: 62px;
            margin-bottom: 10px;
          }
          #add-item {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
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
            transform: scale(1.1, 1.1);
            cursor: pointer;
          }
        `}</style>
      </div>
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
    setTags: bindActionCreators(setTags, dispatch),
    deleteItem: bindActionCreators(removeItem, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
