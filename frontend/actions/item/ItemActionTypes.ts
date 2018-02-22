import ItemActionTypeKeys from './ItemActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { ICollectionData } from '../../api/ItemApi'

export interface IItemPendingAction {
  readonly type: ItemActionTypeKeys.ITEM_PENDING
}

export interface IItemFulfilledAction {
  readonly type: ItemActionTypeKeys.ITEM_FULFILLED
  readonly payload: ICollectionData
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
