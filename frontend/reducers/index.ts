import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import collection from './collection'
import { notificationReducer } from './notifications'
import { userReducer } from './user'
import { UserActionTypeKeys } from '../actions/user/UserActionTypeKeys'

const appReducer = combineReducers<IStoreState>({
  collection,
  notifications: notificationReducer,
  user: userReducer,
  form: reducer,
})

const rootReducer = (state, action) => {
  if (action.type == UserActionTypeKeys.REMOVE_USER) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer
