import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import collection from './collection'
import { notificationReducer } from './notifications'
import { userReducer } from './user'

const rootReducer = combineReducers<IStoreState>({
  collection,
  notifications: notificationReducer,
  user: userReducer,
  form: reducer,
})

export default rootReducer
