import ItemActionTypeKeys from '../actions/item/ItemActionTypeKeys'
import ItemActionTypes from '../actions/item/ItemActionTypes'
import { Item } from '../models/Item'

export interface ItemStateI {
  isLoading: boolean
  item?: Item[]
  errors?: string[]
}

export const itemInitialState: ItemStateI = {
  isLoading: false,
}

export default function itemReducer(
  state = itemInitialState,
  action: ItemActionTypes
): ItemStateI {
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
        item: action.payload.item,
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
