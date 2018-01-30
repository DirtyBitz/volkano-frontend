import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import StoreState from './StoreState'
import { composeWithDevTools } from 'redux-devtools-extension'

export const inititalStore: StoreState = {
  isAuthenticated: false,
}

export const store = (initialState = inititalStore) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
