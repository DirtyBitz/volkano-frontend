jest.mock('../../../api/ItemApi')
import * as actions from '../ItemActions'
import ItemActionTypeKeys from '../ItemActionTypeKeys'
import { ItemApi } from '../../../api/ItemApi'
import { Item } from '../../../models/Item'

describe('Item actions', () => {
  describe('visiting "localhost:3000/collection"', () => {
    it('starts loading items from backend', () => {
      const expected = {
        type: ItemActionTypeKeys.ITEM_PENDING,
      }

      expect(actions.itemPending()).toEqual(expected)
    })

    it('creates an item success action', async () => {
      const data = await ItemApi.getAllItems()

      const expected = {
        type: ItemActionTypeKeys.ITEM_FULFILLED,
        payload: data,
      }

      expect(actions.itemSuccess(data)).toEqual(expected)
    })

    it('creates an item error action', () => {
      const expected = {
        type: ItemActionTypeKeys.ITEM_REJECTED,
        payload: ['Error'],
      }

      expect(actions.itemError(expected.payload)).toEqual(expected)
    })

    it('creates an item deleted action', () => {
      const toBeDeleted: Item = {
        id: 0,
        title: 'Dummy',
        url: 'dummy',
        uid: 0,
        categories: [],
        tags: [],
      }
      const expected = {
        type: ItemActionTypeKeys.ITEM_DELETED,
        payload: toBeDeleted,
      }

      expect(actions.itemDelete(toBeDeleted)).toEqual(expected)
    })
  })
})
