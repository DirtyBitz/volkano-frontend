import ItemActionTypeKeys from './ItemActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { IItemData } from '../../api/ItemApi'

export interface IItemPendingAction {
  readonly type: ItemActionTypeKeys.ITEM_PENDING
}

export interface IItemFulfilledAction {
  readonly type: ItemActionTypeKeys.ITEM_FULFILLED
  readonly payload: IItemData
}

export interface IItemRejectedAction {
  readonly type: ItemActionTypeKeys.ITEM_REJECTED
  readonly payload: string[]
}
type ItemActionTypes =
  | IItemPendingAction
  | IItemFulfilledAction
  | IItemRejectedAction
  | IOtherAction

export default ItemActionTypes
