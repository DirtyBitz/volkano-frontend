import ItemActionTypeKeys from '../actions/item/ItemActionTypeKeys'
import ItemActionTypes from '../actions/item/ItemActionTypes'
import { Item } from '../models/Item'
import { ITag } from '../components/SearchBar'

export interface CollectionStateI {
  isLoading: boolean
  items?: Item[]
  errors?: string[]
  tags: ITag[]
  filteredItems: Item[]
}

export const collectionInitialState: CollectionStateI = {
  isLoading: false,
  tags: [],
  filteredItems: [],
}

export default function collectionReducer(
  state = collectionInitialState,
  action: ItemActionTypes
): CollectionStateI {
  switch (action.type) {
    case ItemActionTypeKeys.FETCHING_COLLECTION:
      return {
        ...state,
        isLoading: true,
        errors: undefined,
      }
    case ItemActionTypeKeys.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
      }
    case ItemActionTypeKeys.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      }
    case ItemActionTypeKeys.DELETE_ITEM:
      const remainingItems = state.items.filter(item => item.id != action.payload.id)
      return {
        ...state,
        items: remainingItems,
        filteredItems: itemsWithTags(remainingItems, state.tags),
      }
    case ItemActionTypeKeys.ADD_TAG:
      const searchTags = [...state.tags, action.payload]
      return {
        ...state,
        tags: searchTags,
        filteredItems: itemsWithTags(state.items, searchTags),
      }
    case ItemActionTypeKeys.REMOVE_TAG:
      const newTags = state.tags.filter(tag => tag.label !== action.payload.label)
      return {
        ...state,
        tags: newTags,
        filteredItems: itemsWithTags(state.items, newTags),
      }
    case ItemActionTypeKeys.CLEAR_TAGS:
      return {
        ...state,
        tags: [],
        filteredItems: [],
      }
    default:
      return state
  }
}

function itemsWithTags(items: Item[], tags: ITag[]) {
  const filtered = items.filter(item => {
    const matchingTags = item.tags.filter(tag => {
      return tags.find(t => t.label === tag)
    })
    return matchingTags.length === tags.length
  })
  return filtered || []
}
