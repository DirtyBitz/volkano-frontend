import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import isAuthenticated from './authenticationReducer'

const rootReducer = combineReducers<IStoreState>({
  authentication: isAuthenticated,
  form: reducer,
})

export default rootReducer
