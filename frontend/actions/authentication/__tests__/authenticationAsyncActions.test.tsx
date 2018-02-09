jest.mock('../../../api/AuthApi')
import thunk from 'redux-thunk'
import * as actions from '../AuthActions'
import createMockStore from 'redux-mock-store'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication thunk actions', () => {
  let store

  beforeEach(() => {
    store = createMockStore([thunk])({})
  })

  it('Sign in action happy path', async () => {
    const expectedActions = [
      actions.signInPending(),
      actions.signInSuccess(await AuthApi.authenticateUser('username', 'passworrd')),
    ]

    await store.dispatch(actions.signIn('username', 'passworrd'))

    expect(store.getActions()).toEqual(expectedActions)
  })
})
