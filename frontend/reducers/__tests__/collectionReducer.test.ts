//jest.mock('../../api/ItemApi')
import collectionReducer, {
  collectionInitialState,
  CollectionStateI,
} from '../collectionReducer'
import { OtherAction } from '../../actions/IOtherAction'
import { itemPending, itemSuccess, itemError } from '../../actions/item/ItemActions'
import { ItemApi } from '../../api/ItemApi'

describe('Collection reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      items: undefined,
      errors: undefined,
    }
    expect(collectionReducer(undefined, OtherAction)).toEqual(expectedState)
  })

  it('Should handle collect items pending', () => {
    const expectedState: CollectionStateI = {
      isLoading: true,
      items: undefined,
      errors: undefined,
    }

    const newState = collectionReducer(collectionInitialState, itemPending())

    expect(newState).toEqual(expectedState)
  })
  it('Should handle when collect items is rejected', async () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      errors: ['this is a fake error message'],
      items: undefined,
    }

    const state = collectionReducer(
      expectedState,
      itemError(['this is a fake error message'])
    )

    expect(state).toEqual(expectedState)
  })
  it('Should handle when collect items is successfull', async () => {
    const mockResponse = await ItemApi.getAllItems('fake-token')

    const expectedState: CollectionStateI = {
      isLoading: false,
      items: mockResponse.items,
    }

    const state = collectionReducer(expectedState, itemSuccess(mockResponse))

    expect(state).toEqual(expectedState)
  })
})
