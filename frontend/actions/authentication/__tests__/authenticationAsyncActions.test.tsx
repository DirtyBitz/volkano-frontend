jest.mock('../../../api/AuthApi')
import thunk from 'redux-thunk'
import * as actions from '../AuthActions'
import createMockStore, { MockStore } from 'redux-mock-store'
import { AuthApi } from '../../../api/AuthApi'

describe('Authentication thunk actions', () => {
  let store: MockStore<{}>

  beforeEach(() => {
    store = createMockStore([thunk])({})
  })

  it('Sign in action is a thunk', () => {
    const thunk = actions.signIn('username', 'password')
    expect(typeof thunk).toBe('function')
  })

  it('Sign in action happy path', async () => {
    const expectedActions = [
      actions.signInPending(),
      actions.signInSuccess(await AuthApi.authenticateUser('username', 'passworrd')),
    ]

    await store.dispatch(actions.signIn('username', 'passworrd'))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Sign in action sad path', async () => {
    const expectedActions = [actions.signInPending(), actions.signInError(['Did throw'])]
    await store.dispatch(actions.signIn('throw', 'throw'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Create user happy path', async () => {
    const newUser = {
      email: 'test@user.com',
      password: 'test123',
    }

    const expectedActions = [
      actions.createUserPending(),
      actions.createUserSuccess(await AuthApi.registerNewUser(newUser)),
    ]

    await store.dispatch(actions.createUser(newUser))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('create user sad path', async () => {
    const newUser = {
      email: 'throw',
      password: 'test123',
    }
    const expectedActions = [
      actions.createUserPending(),
      actions.createUserError(['Did throw']),
    ]
    await store.dispatch(actions.createUser(newUser))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
