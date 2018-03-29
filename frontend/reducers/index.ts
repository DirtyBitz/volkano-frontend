import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import collectionReducer from './collectionReducer'

const rootReducer = combineReducers<IStoreState>({
  collection: collectionReducer,
  form: reducer,
})

export default rootReducer
