import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import isAuthenticated from './authenticationReducer'
import collectionReducer from './collectionReducer'
import requestReducer from './requestReducer'

const rootReducer = combineReducers<IStoreState>({
  authentication: isAuthenticated,
  collection: collectionReducer,
  form: reducer,
  requestReducer,
})

export default rootReducer
