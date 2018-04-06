import * as actions from '../ItemActions'
import ItemActionTypeKeys from '../ItemActionTypeKeys'
import { Item } from '../../../models/Item'
import { ICollectionData } from '../../../api/ItemApi'

describe('Item actions', () => {
  describe('fetching collection', () => {
    const toBeDeleted: Item = {
      id: 0,
      title: 'Dummy',
      url: 'dummy',
      uid: 0,
      categories: [],
      tags: [],
    }

    const fakeItems: ICollectionData = { items: [toBeDeleted] }

    it('starts loading entire collection', () => {
      const expected = {
        type: ItemActionTypeKeys.FETCHING_COLLECTION,
      }

      expect(actions.collectionPending()).toEqual(expected)
    })

    it('creates a success action', async () => {
      const expected = {
        type: ItemActionTypeKeys.FETCH_COLLECTION_SUCCESS,
        payload: fakeItems,
      }

      expect(actions.collectionSuccess(fakeItems)).toEqual(expected)
    })

    it('creates an error action', () => {
      const error = ['Error']
      const expected = {
        type: ItemActionTypeKeys.FETCH_COLLECTION_FAILURE,
        payload: error,
      }

      expect(actions.collectionFailure(error)).toEqual(expected)
    })

    it('creates an item deleted action', () => {
      const expected = {
        type: ItemActionTypeKeys.DELETE_ITEM,
        payload: toBeDeleted,
      }

      expect(actions.deleteItem(toBeDeleted)).toEqual(expected)
    })
  })
})
