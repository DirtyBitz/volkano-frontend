import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import authentication from './authentication'
import collectionReducer from './collectionReducer'

const rootReducer = combineReducers<IStoreState>({
  authentication,
  collection: collectionReducer,
  form: reducer,
})

export default rootReducer
