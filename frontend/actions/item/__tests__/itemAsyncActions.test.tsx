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

  describe('allItems', () => {
    it('returns a thunk', () => {
      const thunk = actions.allItems()
      expect(typeof thunk).toBe('function')
    })

    it('with no errors', async () => {
      const expectedActions = [
        actions.collectionPending(),
        actions.collectionSuccess(await ItemApi.getAllItems()),
      ]

      await store.dispatch(actions.allItems())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('with errors', async () => {
      ItemApi.getAllItems.mockImplementation(() => {
        throw ['Did throw']
      })
      const expectedActions = [
        actions.collectionPending(),
        actions.collectionFailure(['Did throw']),
      ]
      await store.dispatch(actions.allItems())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('createItem', () => {
    const validItem = { title: 'Dummy', url: 'dummy', tags: '' }
    it('returns a thunk', () => {
      const thunk = actions.createItem(validItem)
      expect(typeof thunk).toBe('function')
    })

    it('with no errors', async () => {
      const fucknuts = { ...validItem, id: 0, uid: 0, categories: [], tags: [] }
      const expectedActions = [actions.addItem(fucknuts)]
      ItemApi.createItem.mockImplementation(() => fucknuts)
      await store.dispatch(actions.createItem(validItem))

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('with errors', async () => {
      const errors = ['Errors', 'everywhere']
      const expectedActions = [actions.itemError(errors)]
      ItemApi.createItem.mockImplementation(() => {
        throw errors
      })
      await store.dispatch(actions.createItem(validItem))

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('removeItem', () => {
    const validItem = {
      title: 'Dummy',
      url: 'dummy',
      id: 0,
      uid: 0,
      tags: [],
      categories: [],
    }
    it('returns a thunk', () => {
      const thunk = actions.removeItem(validItem)
      expect(typeof thunk).toBe('function')
    })

    it('with no errors', async () => {
      const expectedActions = [actions.deleteItem(validItem)]
      await store.dispatch(actions.removeItem(validItem))

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('with errors', async () => {
      const errors = ['Errors', 'everywhere']
      const expectedActions = [actions.itemError(errors)]
      ItemApi.deleteItem.mockImplementation(() => {
        throw errors
      })
      await store.dispatch(actions.removeItem(validItem))

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
