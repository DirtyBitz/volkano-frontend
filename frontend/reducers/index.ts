import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { IStoreState } from '../store/StoreState'
import isAuthenticated from './authenticationReducer'

const rootReducer = combineReducers<IStoreState>({
  authentication: isAuthenticated,
  form: formReducer,
})

export default rootReducer
