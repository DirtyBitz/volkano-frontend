import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import collection from './collection'
import { notificationReducer } from './notifications'

const rootReducer = combineReducers<IStoreState>({
  collection,
  notifications: notificationReducer,
  form: reducer,
})

export default rootReducer
