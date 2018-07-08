import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { allItems, removeItem, setTags } from '../actions/item/ItemActions'
import { ICollectionState } from '../reducers/collection'
import ItemCard from './ItemCard'
import { Item } from '../models/Item'
import { ItemModal } from './ItemModal'
import Link from 'next/link'
import { Grid, Dropdown, Button } from 'semantic-ui-react'
import { PulseLoader } from 'react-spinners'
import BottomScrollListener from 'react-bottom-scroll-listener'
import Layout from './Layout'
import EmptyCollection from './EmptyCollection'

export interface ITag {
  label: any
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
  openModal: boolean
}

class Collection extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: undefined,
      openModal: false,
    }
  }

  componentDidMount() {
    this.fetchNextPage()
  }

  private fetchNextPage = () => {
    const { currentPage } = this.props.collection
    this.props.allItems(currentPage + 1)
  }

  private onItemClick = () => this.setState({ openModal: true })

  private onItemSelect = (item: Item) => {
    this.onItemClick()
    this.setState({
      selectedItem: item,
    })
  }

  private unselectItem = () => {
    this.setState({
      selectedItem: undefined,
      openModal: false,
    })
  }

  private onKeyEvent = keyevent => {
    const { items, filteredItems } = this.props.collection
    const collection = filteredItems.length ? filteredItems : items

    const index = collection.findIndex(item => {
      return this.state.selectedItem === item
    })
    if (keyevent === 'ArrowRight' && collection.length - 1 == index) return
    else if (keyevent === 'ArrowLeft' && index - 1 < 0) return
    keyevent === 'ArrowRight'
      ? this.setState({ selectedItem: collection[index + 1] })
      : this.setState({ selectedItem: collection[index - 1] })
  }

  private deleteItem = (item: Item) => {
    this.props.deleteItem(item)
    this.unselectItem()
  }

  render() {
    const { selectedItem } = this.state
    const { setTags, collection } = this.props
    const showFiltered = collection.tags.length > 0
    const items = showFiltered ? collection.filteredItems : collection.items
    const hasNoItems =
      !collection.isLoading && collection.hasFetchedAll && collection.items.length === 0
    const searchTags = (collection.items || []).map(item => {
      return [...item.categories, ...item.tags]
    })
    const catted = searchTags.reduce((prev, curr) => [...prev, ...curr], [])
    const tags = [...new Set(catted)].map(val => ({ value: val, key: val, text: val }))

    if (hasNoItems)
      return (
        <Layout>
          <EmptyCollection />
        </Layout>
      )
    return (
      <Layout>
        <div id="search-bar">
          <Dropdown
            fluid
            multiple
            search
            selection
            options={tags}
            onChange={(event, data) => {
              const values = data.value as string[]
              const tags = values.map(value => ({
                value: value,
                label: value,
              }))
              setTags(tags)
            }}
          />
        </div>
        <Grid centered id="collage">
          {(items || []).map(item => (
            <ItemCard key={item.id} item={item} onSelect={this.onItemSelect} />
          ))}
        </Grid>

        <ItemModal
          item={selectedItem}
          onClose={this.unselectItem}
          onNext={() => this.onKeyEvent('ArrowRight')}
          onPrev={() => this.onKeyEvent('ArrowLeft')}
          onDelete={this.deleteItem}
        />

        {selectedItem ? (
          false
        ) : (
          <div id="add-item">
            <Link href="/additem">
              <Button circular color="green" size="massive" icon="add" />
            </Link>
          </div>
        )}
        {collection.isLoading && (
          <div className="sweet-loader">
            <PulseLoader color={'#aaaaaa'} loading={collection.isLoading} size={30} />
          </div>
        )}

        {!collection.hasFetchedAll &&
          !collection.isLoading && (
            <BottomScrollListener offset={400} onBottom={this.fetchNextPage} />
          )}

        <style jsx>{`
          #search-bar {
            margin-bottom: 10px;
            margin-bottom: 30px;
          }
          #add-item {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 30px;
            bottom: 30px;
          }
          .sweet-loader {
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
          }
        `}</style>
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
    setTags: bindActionCreators(setTags, dispatch),
    deleteItem: bindActionCreators(removeItem, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
