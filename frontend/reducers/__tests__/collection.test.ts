import collection, { COLLECTION_INITIAL_STATE, ICollectionState } from '../collection'
import { OtherAction } from '../../actions/IOtherAction'
import {
  collectionPending,
  collectionSuccess,
  collectionFailure,
  setTags,
  deleteItem,
  addItem,
} from '../../actions/item/ItemActions'
import { ICollectionData } from '../../api/ItemApi'
import { ITag } from '../../components/Collection'
import { Item } from '../../models/Item'
import { getMockItems } from '../../models/__mockdata__/Item'

const fakeData: ICollectionData = {
  items: [
    {
      id: 0,
      title: 'Cute Kitty',
      url: 'https://i.imgur.com/gbwgfw6.jpg',
      uid: 2,
      tags: ['animal', 'kitty'],
      categories: ['image/jpeg', 'jpg'],
      mediatype: 'image',
      size: 1337,
    },
    {
      id: 1,
      title: 'Cold Kitty',
      url: 'https://i.imgur.com/t6RdGpq.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
      mediatype: 'image',
      size: 1337,
    },
  ],
}

describe('Collection reducer', () => {
  it('should return the initial state', () => {
    // Explisitly declase state in this test,
    // don't spread the initial state
    const expectedState: ICollectionState = {
      hasFetchedAll: false,
      currentPage: 0,
      isLoading: false,
      items: undefined,
      errors: undefined,
      tags: [],
      filteredItems: [],
    }

    expect(collection(undefined, OtherAction)).toEqual(expectedState)
  })

  it('should handle collection pending', () => {
    const expectedState: ICollectionState = {
      ...COLLECTION_INITIAL_STATE,
      isLoading: true,
    }

    const newState = collection(COLLECTION_INITIAL_STATE, collectionPending())

    expect(newState).toEqual(expectedState)
  })
  it('should handle when collect items is rejected', async () => {
    const expectedState: ICollectionState = {
      ...COLLECTION_INITIAL_STATE,
      currentPage: 0,
      errors: ['this is a fake error message'],
    }

    const newState = collection(
      expectedState,
      collectionFailure(['this is a fake error message'])
    )

    expect(newState).toEqual(expectedState)
  })

  it('should handle when collect items is successful', async () => {
    const expectedState: ICollectionState = {
      ...COLLECTION_INITIAL_STATE,
      currentPage: 1,
      items: fakeData.items,
    }

    const state = collection(undefined, collectionSuccess(fakeData))

    expect(state).toEqual(expectedState)
  })

  it('should handle pagination', async () => {
    const fakeItems1 = { items: getMockItems(25) }
    const fakeItems2 = { items: getMockItems(25) }
    const fakeItems3 = { items: [] }

    const state1 = collection(undefined, collectionSuccess(fakeItems1))
    const state2 = collection(state1, collectionSuccess(fakeItems2))
    const finalState = collection(state2, collectionSuccess(fakeItems3))
    expect(finalState.items.length).toEqual(50)
    expect(finalState.hasFetchedAll).toEqual(true)
  })

  it('should handle adding single item', async () => {
    const fakeItems1 = { items: getMockItems(3) }
    const newItem = getMockItems(1)[0]

    const state1 = collection(undefined, collectionSuccess(fakeItems1))
    const finalState = collection(state1, addItem(newItem))

    expect(finalState.items.length).toEqual(4)
  })

  it('should handle item deletion', async () => {
    const initialState: ICollectionState = {
      ...COLLECTION_INITIAL_STATE,
      currentPage: 1,
      items: [
        {
          id: 0,
          uid: 0,
          title: 'First',
          url: 'firsturl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
        {
          id: 1,
          uid: 1,
          title: 'Second',
          url: 'secondurl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
        {
          id: 2,
          uid: 2,
          title: 'Third',
          url: 'thirdurl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
      ],
    }

    const expectedState: ICollectionState = {
      ...COLLECTION_INITIAL_STATE,
      currentPage: 1,
      items: [
        {
          id: 0,
          uid: 0,
          title: 'First',
          url: 'firsturl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
        {
          id: 2,
          uid: 2,
          title: 'Third',
          url: 'thirdurl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
      ],
      filteredItems: [
        {
          id: 0,
          uid: 0,
          title: 'First',
          url: 'firsturl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
        {
          id: 2,
          uid: 2,
          title: 'Third',
          url: 'thirdurl',
          tags: [],
          categories: [],
          mediatype: '',
          size: 0,
        },
      ],
    }
    const action = deleteItem({
      id: 1,
      uid: 1,
      title: 'Second',
      url: 'secondurl',
      tags: [],
      categories: [],
      mediatype: '',
      size: 0,
    })

    const state = collection(initialState, action)

    expect(state).toEqual(expectedState)
  })

  describe('Tag filtering', () => {
    const testTags = [
      { label: 'test1', value: 'test1' },
      { label: 'test2', value: 'test2' },
    ]

    it('should add a tag', () => {
      const initState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        items: fakeData.items,
      }

      const expectedState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        currentPage: 1,
        items: fakeData.items,
        tags: [testTags[0]],
      }

      const newState = collection(initState, setTags([testTags[0]]))

      expect(newState.tags).toEqual(expectedState.tags)
    })

    it('should clear all tags', () => {
      const initState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        items: fakeData.items,
        tags: [...testTags],
      }

      const expectedState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        currentPage: 1,
        items: fakeData.items,
      }

      const newState = collection(initState, setTags([]))

      expect(newState.tags).toEqual(expectedState.tags)
    })

    it('should create a filtered list when adding single tag', () => {
      const originalItems: Item[] = [
        {
          uid: 1,
          title: 'dog',
          tags: ['dog'],
          id: 1,
          url: '',
          categories: [],
          mediatype: '',
          size: 0,
        },
        {
          uid: 2,
          title: 'cat',
          tags: ['cat'],
          id: 2,
          url: '',
          categories: [],
          mediatype: '',
          size: 0,
        },
      ]

      const tag: ITag = {
        label: 'dog',
        value: 'dog',
      }

      const initState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        items: originalItems,
      }

      const expectedState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        currentPage: 1,
        items: originalItems,
        tags: [tag],
        filteredItems: [originalItems[0]],
      }

      const newState = collection(initState, setTags([tag]))

      expect(newState.filteredItems).toEqual(expectedState.filteredItems)
    })

    it('should create filtered list when adding multiple tags', () => {
      const originalItems: Item[] = [
        {
          uid: 1,
          title: 'dog',
          tags: ['dog', 'animal'],
          id: 1,
          url: '',
          categories: [],
          mediatype: '',
          size: 0,
        },
        {
          uid: 2,
          title: 'cat',
          tags: ['cat', 'animal'],
          id: 2,
          url: '',
          categories: [],
          mediatype: '',
          size: 0,
        },
      ]

      const tag: ITag = {
        label: 'dog',
        value: 'dog',
      }

      const tag1: ITag = {
        label: 'animal',
        value: 'animal',
      }

      const initState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        items: originalItems,
      }

      const expectedState: ICollectionState = {
        ...COLLECTION_INITIAL_STATE,
        currentPage: 1,
        items: originalItems,
        tags: [tag, tag1],
        filteredItems: [originalItems[0]],
      }

      const finalState = collection(initState, setTags([tag, tag1]))

      expect(finalState.filteredItems).toEqual(expectedState.filteredItems)
    })
  })
})
