import thunk from 'redux-thunk'
import * as actions from '../AuthActions'
import * as createMockStore from 'redux-mock-store'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication thunk actions', () => {
  let store

  beforeEach(() => {
    //@ts-ignore
    store = createMockStore([thunk])({})
  })

  it('Sign in action happy path', async () => {
    const expectedActions = [
      actions.signInPending(),
      actions.signInSuccess(await AuthApi.authenticateUser('test', 'test')),
    ]

    await store.dispatch(actions.signIn('test', 'test'))

    expect(store.getActions()).toEqual(expectedActions)
  })
})
