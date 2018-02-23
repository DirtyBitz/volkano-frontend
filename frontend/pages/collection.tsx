import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { Layout } from '../components/Layout'
import { allItems } from '../actions/item/ItemActions'
import { CollectionStateI } from '../reducers/collectionReducer'
import Item from '../components/Item'

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

    return (
      <Layout title="Collection">
        <div id="collage">
          {items &&
            items.map(item => (
              <div key={item.id}>
                <Item url={item.url} title={item.title} />
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
  }
}
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    allItems: bindActionCreators(allItems, dispatch),
  }
}
export default withRedux(store, mapStateToProps, mapDispatchToProps)(CollectionPage)
