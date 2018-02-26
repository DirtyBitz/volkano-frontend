import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { Layout } from '../components/Layout'
import { allItems } from '../actions/item/ItemActions'
import { CollectionStateI } from '../reducers/collectionReducer'
import ItemCard from '../components/ItemCard'

interface IProps extends IStoreState {
  allItems: (token: string) => Promise<void>
  collection: CollectionStateI
}
class CollectionPage extends React.Component<IProps> {
  async componentWillMount() {
    await this.props.allItems('fake-token')
  }

  render() {
    const { items } = this.props.collection
    const { authentication } = this.props

    return (
      <Layout title="Collection" authentication={authentication}>
        <div id="collage">
          {items &&
            items.map(item => (
              <div key={item.id}>
                <ItemCard item={item} />
              </div>
            ))}
          <style jsx>{`
            div {
              display: inline-block;
              text-align: center;
              padding: 5px;
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
  }
}
export default withRedux(store, mapStateToProps, mapDispatchToProps)(CollectionPage)
