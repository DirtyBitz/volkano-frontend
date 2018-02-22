import ItemActionTypeKeys from '../actions/item/ItemActionTypeKeys'
import ItemActionTypes from '../actions/item/ItemActionTypes'
import { Item } from '../models/Item'

export interface CollectionStateI {
  isLoading: boolean
  items?: Item[]
  errors?: string[]
}

export const collectionInitialState: CollectionStateI = {
  isLoading: false,
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
    default:
      return state
  }
}
