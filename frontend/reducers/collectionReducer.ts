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
    case ItemActionTypeKeys.ITEM_PENDING:
      return {
        ...state,
        isLoading: true,
        errors: undefined,
      }
    case ItemActionTypeKeys.ITEM_FULFILLED:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
      }
    case ItemActionTypeKeys.ITEM_REJECTED:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      }
    case ItemActionTypeKeys.ADD_TAG:
      const searchTags = [...state.tags, action.payload]
      return {
        ...state,
        tags: [...state.tags, action.payload],
        filteredItems: state.items.filter(item => {
          let foundTagInItem = false
          searchTags.forEach(tag => {
            const found = item.tags.find(t => {
              return t.toLowerCase() === tag.label.toLowerCase()
            })
            if (found) {
              foundTagInItem = true
            }
          })
          return foundTagInItem
        }),
      }
    case ItemActionTypeKeys.REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag.label !== action.payload.label),
        filteredItems: state.items.filter(item => {
          state.tags.forEach(tag => {
            const found = item.tags.find(t => t === tag.label)
            if (found) return true
          })
          return false
        }),
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
