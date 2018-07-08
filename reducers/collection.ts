import ItemActionTypeKeys from '../actions/item/ItemActionTypeKeys'
import ItemActionTypes from '../actions/item/ItemActionTypes'
import { Item } from '../models/Item'
import { ITag } from '../components/Collection'

export interface ICollectionState {
  isLoading: boolean
  currentPage: number
  hasFetchedAll: boolean
  items?: Item[]
  errors?: string[]
  tags: ITag[]
  filteredItems: Item[]
}

export const COLLECTION_INITIAL_STATE: ICollectionState = {
  isLoading: false,
  currentPage: 0,
  hasFetchedAll: false,
  tags: [],
  filteredItems: [],
}

export default function collection(
  state = COLLECTION_INITIAL_STATE,
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
        items: combineItems(action.payload.items, state.items),
        currentPage: state.currentPage + 1,
        hasFetchedAll: action.payload.items.length === 0 ? true : false,
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
    case ItemActionTypeKeys.ADD_ITEM:
      return {
        ...state,
        items: !!state.items ? [...state.items, action.payload] : [action.payload],
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

function combineItems(newItems: Item[], oldItems?: Item[]) {
  if (!oldItems) {
    return newItems
  }
  const combinedItems: Item[] = [...oldItems]

  newItems.forEach(newItem => {
    const alreadyAdded = oldItems.find(item => item.id === newItem.id)
    if (!alreadyAdded) {
      combinedItems.push(newItem)
    }
  })

  return combinedItems
}
