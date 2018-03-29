import collectionReducer, {
  collectionInitialState,
  CollectionStateI,
} from '../collectionReducer'
import { OtherAction } from '../../actions/IOtherAction'
import {
  collectionPending,
  collectionSuccess,
  collectionFailure,
  addTag,
  removeTag,
  clearTags,
} from '../../actions/item/ItemActions'
import { ICollectionData } from '../../api/ItemApi'
import { ITag } from '../../components/SearchBar'
import { Item } from '../../models/Item'

const fakeData: ICollectionData = {
  items: [
    {
      id: 0,
      title: 'Cute Kitty',
      url: 'https://i.imgur.com/gbwgfw6.jpg',
      uid: 2,
      tags: ['animal', 'kitty'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 1,
      title: 'Cold Kitty',
      url: 'https://i.imgur.com/t6RdGpq.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
  ],
}

describe('Collection reducer', () => {
  it('should return the initial state', () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      items: undefined,
      errors: undefined,
      tags: [],
      filteredItems: [],
    }

    expect(collectionReducer(undefined, OtherAction)).toEqual(expectedState)
  })

  it('should handle collection pending', () => {
    const expectedState: CollectionStateI = {
      isLoading: true,
      items: undefined,
      errors: undefined,
      tags: [],
      filteredItems: [],
    }

    const newState = collectionReducer(collectionInitialState, collectionPending())

    expect(newState).toEqual(expectedState)
  })
  it('should handle when collect items is rejected', async () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      errors: ['this is a fake error message'],
      items: undefined,
      tags: [],
      filteredItems: [],
    }

    const newState = collectionReducer(
      expectedState,
      collectionFailure(['this is a fake error message'])
    )

    expect(newState).toEqual(expectedState)
  })

  it('should handle when collect items is successful', async () => {
    const expectedState: CollectionStateI = {
      isLoading: false,
      items: fakeData.items,
      tags: [],
      filteredItems: [],
    }

    const state = collectionReducer(expectedState, collectionSuccess(fakeData))

    expect(state).toEqual(expectedState)
  })

  describe('Tag filtering', () => {
    const testTags = [
      { label: 'test1', value: 'test1' },
      { label: 'test2', value: 'test2' },
    ]

    it('should add a tag', () => {
      const initState: CollectionStateI = {
        isLoading: false,
        items: fakeData.items,
        tags: [],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: fakeData.items,
        tags: [testTags[0]],
        filteredItems: [],
      }

      const newState = collectionReducer(initState, addTag(testTags[0]))

      expect(newState.tags).toEqual(expectedState.tags)
    })

    it('should remove a tag', () => {
      const initState: CollectionStateI = {
        isLoading: false,
        items: fakeData.items,
        tags: [testTags[0]],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: fakeData.items,
        tags: [],
        filteredItems: [],
      }

      const newState = collectionReducer(initState, removeTag(testTags[0]))

      expect(newState.tags).toEqual(expectedState.tags)
    })

    it('should clear all tags', () => {
      const initState: CollectionStateI = {
        isLoading: false,
        items: fakeData.items,
        tags: [...testTags],
        filteredItems: [],
      }

      const expectedState: CollectionStateI = {
        isLoading: false,
        items: fakeData.items,
        tags: [],
        filteredItems: [],
      }

      const newState = collectionReducer(initState, clearTags())

      expect(newState.tags).toEqual(expectedState.tags)
    })
    it('should create a filtered list when adding single tag', () => {
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
    it('should create filtered list when adding multiple tags', () => {
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

    it('should filter correcly when removing a tag', () => {
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
