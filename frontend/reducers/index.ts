import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import isAuthenticated from './authenticationReducer'
import itemReducer from './itemReducer'

const rootReducer = combineReducers<IStoreState>({
  authentication: isAuthenticated,
  item: itemReducer,
  form: reducer,
})

export default rootReducer
