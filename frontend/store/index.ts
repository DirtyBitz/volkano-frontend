import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import StoreState from './StoreState'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authInitialState } from '../reducers/authenticationReducer'

export const inititalStore: StoreState = {
  authentication: authInitialState,
}

export const store = (initialState = inititalStore) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
