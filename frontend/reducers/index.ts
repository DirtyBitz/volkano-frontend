import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import collection from './collection'

const rootReducer = combineReducers<IStoreState>({
  collection,
  form: reducer,
})

export default rootReducer
