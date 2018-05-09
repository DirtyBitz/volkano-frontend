import ItemActionTypeKeys from '../actions/item/ItemActionTypeKeys'
import ItemActionTypes from '../actions/item/ItemActionTypes'
import { Item } from '../models/Item'
import { ITag } from '../components/Collection'

export interface ICollectionState {
  isLoading: boolean
  items?: Item[]
  errors?: string[]
  tags: ITag[]
  filteredItems: Item[]
}

export const collectionInitialState: ICollectionState = {
  isLoading: false,
  tags: [],
  filteredItems: [],
}

export default function collection(
  state = collectionInitialState,
  action: ItemActionTypes
): ICollectionState {
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
    case ItemActionTypeKeys.SET_TAGS:
      return {
        ...state,
        tags: action.payload,
        filteredItems: itemsWithTags(state.items, action.payload),
      }
    default:
      return state
  }
}

function itemsWithTags(items: Item[], tags: ITag[]) {
  const filtered = items.filter(item => {
    const allTags = [...item.tags, ...item.categories]
    const matchingTags = allTags.filter(tag => {
      return tags.find(t => t.label === tag)
    })
    return matchingTags.length === tags.length
  })
  return filtered
}
