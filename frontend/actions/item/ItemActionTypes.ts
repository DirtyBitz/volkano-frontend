import ItemActionTypeKeys from './ItemActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { ICollectionData } from '../../api/ItemApi'
import { ITag } from '../../components/SearchBar'

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

export interface IAddTagAction {
  readonly type: ItemActionTypeKeys.ADD_TAG
  readonly payload: ITag
}

export interface IRemoveTagAction {
  readonly type: ItemActionTypeKeys.REMOVE_TAG
  readonly payload: ITag
}

export interface IClearTagsAction {
  readonly type: ItemActionTypeKeys.CLEAR_TAGS
}

type ItemActionTypes =
  | IItemPendingAction
  | IItemFulfilledAction
  | IItemRejectedAction
  | IAddTagAction
  | IRemoveTagAction
  | IClearTagsAction
  | IOtherAction

export default ItemActionTypes
