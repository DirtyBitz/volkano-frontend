import { IStoreState } from './StoreState'
import { authInitialState } from '../reducers/authenticationReducer'
import { collectionInitialState } from '../reducers/collectionReducer'

import createStoreFromServer from './ServerStore'
import createStoreFromClient from './ClientStore'

export const _initialState: IStoreState = {
  authentication: authInitialState,
  collection: collectionInitialState,
}

export default (initialState = _initialState, props) => {
  if (props.isServer) {
    return createStoreFromServer(initialState, props)
  } else {
    return createStoreFromClient(initialState)
  }
}
