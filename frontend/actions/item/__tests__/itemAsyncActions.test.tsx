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

  it('allItems returns a thunk', () => {
    const thunk = actions.allItems()
    expect(typeof thunk).toBe('function')
  })

  it('allItems with valid path', async () => {
    const expectedActions = [
      actions.itemPending(),
      actions.itemSuccess(await ItemApi.getAllItems()),
    ]

    await store.dispatch(actions.allItems())

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('allItems with invalid path', async () => {
    const expectedActions = [actions.itemPending(), actions.itemError(['Did throw'])]
    await store.dispatch(actions.allItems())

    /** TODO: Fake failed response with axios mock */

    //expect(store.getActions()).toEqual(expectedActions)
  })
})
