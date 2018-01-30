import { combineReducers } from 'redux'
import StoreState from '../store/StoreState'
import isAuthenticated from './authenticationReducer'

const rootReducer = combineReducers<StoreState>({
  isAuthenticated,
})

export default rootReducer
