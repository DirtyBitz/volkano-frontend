import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import { store } from '../store'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { Layout } from '../components/Layout'
import { allItems } from '../actions/item/ItemActions'

interface IProps extends IStoreState {
  allItems: () => Promise<void>
}
class CollectionPage extends React.Component<IProps> {
  private test = async () => {
    console.log('test')
    await this.props.allItems()
  }

  render() {
    {
      this.test()
    }
    const { item } = this.props

    return <Layout title="Collection">{item && <div>boii</div>}</Layout>
  }
}
const mapStateToProps = (state: IStoreState) => {
  return {
    item: state.item,
  }
}
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    allItems: bindActionCreators(allItems, dispatch),
  }
}
export default withRedux(store, mapStateToProps, mapDispatchToProps)(CollectionPage)
