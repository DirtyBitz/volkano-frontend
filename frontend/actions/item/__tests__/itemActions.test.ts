jest.mock('../../../api/ItemApi')
import * as actions from '../ItemActions'
import ItemActionTypeKeys from '../ItemActionTypeKeys'
import { ItemApi } from '../../../api/ItemApi'

describe('Item actions', () => {
  describe('Entering "localhost:3000/collection"', () => {
    it('loading items from backend', () => {
      const expected = {
        type: ItemActionTypeKeys.ITEM_PENDING,
      }

      expect(actions.itemPending()).toEqual(expected)
    })
    it('Creates a item success action', async () => {
      const data = await ItemApi.getAllItems('fake-token')

      const expected = {
        type: ItemActionTypeKeys.ITEM_FULFILLED,
        payload: data,
      }

      expect(actions.itemSuccess(data)).toEqual(expected)
    })
    it('Creates a item error action', () => {
      const expected = {
        type: ItemActionTypeKeys.ITEM_REJECTED,
        payload: ['Error'],
      }

      expect(actions.itemError(expected.payload)).toEqual(expected)
    })
  })
})
