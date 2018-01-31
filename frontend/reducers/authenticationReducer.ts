import ActionTypeKeys from '../actions/ActionTypeKeys'
import ActionTypes from '../actions/ActionTypes'

export default function authenticationReducer(state = false, action?: ActionTypes) {
  if (!action) return state

  switch (action.type) {
    case ActionTypeKeys.SIGN_IN:
      return onSignIn()
    case ActionTypeKeys.SIGN_OUT:
      return onSignOut()
    default:
      return state
  }
}

function onSignIn() {
  return true
}

function onSignOut() {
  return false
}
