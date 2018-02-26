jest.mock('../../../api/ItemApi')
import thunk from 'redux-thunk'
import * as actions from '../ItemActions'
import createMockStore, { MockStore } from 'redux-mock-store'
import { ItemApi } from '../../../api/ItemApi'

describe('Item thunk actions', () => {
  let store: MockStore<{}>

  beforeEach(() => {
    store = createMockStore([thunk])({})
  })

  it('Get all items action returns a thunk', () => {
    const thunk = actions.allItems('fake-token')
    expect(typeof thunk).toBe('function')
  })

  it('Get all items action happy path', async () => {
    const expectedActions = [
      actions.itemPending(),
      actions.itemSuccess(await ItemApi.getAllItems('fake-token')),
    ]

    await store.dispatch(actions.allItems('fake-token'))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Get all items action sad path', async () => {
    const expectedActions = [actions.itemPending(), actions.itemError(['Did throw'])]
    await store.dispatch(actions.allItems('throw'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
