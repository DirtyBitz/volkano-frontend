jest.mock('../../api/ItemApi')
import collectionReducer, {
  collectionInitialState,
  CollectionStateI,
} from '../collectionReducer'
import { OtherAction } from '../../actions/IOtherAction'
import {
  itemPending,
  itemSuccess,
  itemError,
  addTag,
  removeTag,
  clearTags,
} from '../../actions/item/ItemActions'
import { ItemApi } from '../../api/ItemApi'
import { ITag } from '../../components/SearchBar'
import collection from '../../pages/collection'
import { Item } from '../../models/Item'

describe('Collection reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      items: undefined,
      errors: undefined,
      tags: [],
      filteredItems: [],
    }
    expect(collectionReducer(undefined, OtherAction)).toEqual(expectedState)
  })

  it('Should handle collect items pending', () => {
    const expectedState: CollectionStateI = {
      isLoading: true,
      items: undefined,
      errors: undefined,
      tags: [],
      filteredItems: [],
    }

    const newState = collectionReducer(collectionInitialState, itemPending())

    expect(newState).toEqual(expectedState)
  })
  it('Should handle when collect items is rejected', async () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      errors: ['this is a fake error message'],
      items: undefined,
      tags: [],
      filteredItems: [],
    }

    const state = collectionReducer(
      expectedState,
      itemError(['this is a fake error message'])
    )

    expect(state).toEqual(expectedState)
  })
  it('Should handle when collect items is successful', async () => {
    const mockResponse = await ItemApi.getAllItems('fake-token', 'client', 'uid')

    const expectedState: CollectionStateI = {
      isLoading: false,
      items: mockResponse.items,
      tags: [],
      filteredItems: [],
    }

    const state = collectionReducer(expectedState, itemSuccess(mockResponse))

    expect(state).toEqual(expectedState)
  })

  describe('Tag filtering', () => {
    let fakeItems
    let testTags

    beforeEach(async () => {
      fakeItems = await ItemApi.getAllItems('fake-token', 'client', 'uid')

      testTags = [{ label: 'test1', value: 'test1' }, { label: 'test2', value: 'test2' }]
    })

    it('Should add a tag', () => {
      const initState: CollectionStateI = {
        isLoading: false,
        items: fakeItems.items,
        tags: [],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: fakeItems.items,
        tags: [testTags[0]],
        filteredItems: [],
      }

      const newState = collectionReducer(initState, addTag(testTags[0]))

      expect(newState.tags).toEqual(expectedState.tags)
    })

    it('Shold remove a tag', () => {
      const initState: CollectionStateI = {
        isLoading: false,
        items: fakeItems.items,
        tags: [testTags[0]],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: fakeItems.items,
        tags: [],
        filteredItems: [],
      }

      const newState = collectionReducer(initState, removeTag(testTags[0]))

      expect(newState.tags).toEqual(expectedState.tags)
    })

    it('Should clear all tags', () => {
      const initState: CollectionStateI = {
        isLoading: false,
        items: fakeItems.items,
        tags: [...testTags],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: fakeItems.items,
        tags: [],
        filteredItems: [],
      }

      const newState = collectionReducer(initState, clearTags())

      expect(newState.tags).toEqual(expectedState.tags)
    })
    it('Should create a filtered list when adding single tag', () => {
      const originalItems: Item[] = [
        { uid: 1, title: 'dog', tags: ['dog'], id: 1, url: '', categories: [] },
        { uid: 2, title: 'cat', tags: ['cat'], id: 2, url: '', categories: [] },
      ]

      const tag: ITag = {
        label: 'dog',
        value: 'dog',
      }

      const initState: CollectionStateI = {
        isLoading: false,
        items: originalItems,
        tags: [],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: originalItems,
        tags: [tag],
        filteredItems: [originalItems[0]],
      }

      const newState = collectionReducer(initState, addTag(tag))

      expect(newState.filteredItems).toEqual(expectedState.filteredItems)
    })
    it('Should create filtered list when adding multiple tags', () => {
      const originalItems: Item[] = [
        { uid: 1, title: 'dog', tags: ['dog', 'animal'], id: 1, url: '', categories: [] },
        { uid: 2, title: 'cat', tags: ['cat', 'animal'], id: 2, url: '', categories: [] },
      ]

      const tag: ITag = {
        label: 'dog',
        value: 'dog',
      }

      const tag1: ITag = {
        label: 'animal',
        value: 'animal',
      }

      const initState: CollectionStateI = {
        isLoading: false,
        items: originalItems,
        tags: [],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: originalItems,
        tags: [tag, tag1],
        filteredItems: [originalItems[0]],
      }

      const addFirstTag = collectionReducer(initState, addTag(tag))
      const finalState = collectionReducer(addFirstTag, addTag(tag1))

      expect(finalState.filteredItems).toEqual(expectedState.filteredItems)
    })
    it('Should filter correcly when removing a tag', () => {
      const originalItems: Item[] = [
        { uid: 1, title: 'dog', tags: ['dog', 'animal'], id: 1, url: '', categories: [] },
        { uid: 2, title: 'cat', tags: ['cat', 'animal'], id: 2, url: '', categories: [] },
      ]

      const tag: ITag = {
        label: 'dog',
        value: 'dog',
      }

      const tag1: ITag = {
        label: 'animal',
        value: 'animal',
      }

      const initState: CollectionStateI = {
        isLoading: false,
        items: originalItems,
        tags: [tag, tag1],
        filteredItems: [originalItems[0]],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: originalItems,
        tags: [tag1],
        filteredItems: [...originalItems],
      }
      const newState = collectionReducer(initState, removeTag(tag))

      expect(newState.filteredItems).toEqual(expectedState.filteredItems)
    })
  })
})
