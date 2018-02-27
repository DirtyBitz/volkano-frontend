import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (initialState, { isServer }) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
