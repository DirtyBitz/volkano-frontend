import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import createMockStore, { MockStore } from 'redux-mock-store'
import { VolkanoRequest } from '../VolkanoRequest'
import {
  requestSuccess,
  requestServerError,
  requestUnauthorized,
  requestUnprocessable,
  requestUnknownError,
} from '../../actions/request/RequestActions'

import { IStoreState } from '../../store/StoreState'

describe('Volkano request adapter', () => {
  // Can I mock the store so that the CUT gets the mock
  // instead of the real store when it tries to reach for it?
  var store: MockStore<{}>
  var mock
  const initialState: IStoreState = {
    authentication: {
      isLoading: false,
      token: 'original-token',
      uid: 'test@example.com',
      client: 'original-client',
    },
    collection: {
      isLoading: false,
    },
  }

  beforeEach(() => {
    store = createMockStore([thunk])(initialState)
    mock = new MockAdapter(axios)
  })

  it('makes requests using authentication from store', async () => {
    const state: IStoreState = store.getState()
    const originalToken = state.authentication.token
    var token: string
    mock.onGet('/').reply(config => {
      token = config.headers.token
      return [200, {}, { token: 'new-token' }]
    })
    const wrapped = new VolkanoRequest(store)
    await wrapped.get('/')
    expect(token).toBe(originalToken)
  })

  it('should update token on successful request', async () => {
    const newToken = 'new-token'
    mock.onGet('/').reply(200, { data: 'hello' }, { token: newToken })
    const wrapped = new VolkanoRequest(store)
    const expected = [requestSuccess(newToken)]
    const result = await wrapped.get('/')
    expect(result.data).toEqual('hello')
    expect(store.getActions()).toEqual(expected)
  })

  it('should not change token on server error response', async () => {
    mock.onGet('/').reply(500, {})
    const wrapped = new VolkanoRequest(store)
    const expected = [requestServerError()]
    await wrapped.get('/')
    expect(store.getActions()).toEqual(expected)
  })

  it('should sign out user when it does not know what to do', async () => {
    mock.onGet('/').reply(418, { data: 'Suck my spout, bitch.' })
    const wrapped = new VolkanoRequest(store)
    const expected = [requestUnknownError()]
    await wrapped.get('/')
    expect(store.getActions()).toEqual(expected)
  })

  it('should sign out user on unauthorized response', async () => {
    mock.onGet('/').reply(401, {})
    const wrapped = new VolkanoRequest(store)
    const expected = [requestUnauthorized()]
    await wrapped.get('/')
    expect(store.getActions()).toEqual(expected)
  })

  it('should sign out user when it does not know what to do', async () => {
    mock.onGet('/').reply(418, { data: 'Suck my spout, bitch.' })
    const wrapped = new VolkanoRequest(store)
    const expected = [requestUnknownError()]
    await wrapped.get('/')
    expect(store.getActions()).toEqual(expected)
  })

  it('should sign out user when it does not know what to do', async () => {
    const newToken = 'second-try-token'
    const errorMessage = { data: 'your item sucked' }
    mock.onGet('/').reply(422, errorMessage, { token: newToken })
    const wrapped = new VolkanoRequest(store)
    const expected = [requestUnprocessable(newToken)]
    const response = await wrapped.get('/')
    expect(response.response.data).toEqual(errorMessage)
    expect(store.getActions()).toEqual(expected)
  })
})
