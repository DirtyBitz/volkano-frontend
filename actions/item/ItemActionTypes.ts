import ItemActionTypeKeys from './ItemActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { ICollectionData } from '../../api/ItemApi'
import { ITag } from '../../components/Collection'
import { Item } from '../../models/Item'

export interface IFetchCollectionPendingAction {
  readonly type: ItemActionTypeKeys.FETCHING_COLLECTION
}

export interface IFetchCollectionSuccessAction {
  readonly type: ItemActionTypeKeys.FETCH_COLLECTION_SUCCESS
  readonly payload: ICollectionData
}

export interface IFetchCollectionFailureAction {
  readonly type: ItemActionTypeKeys.FETCH_COLLECTION_FAILURE
  readonly payload: string[]
}

export interface IItemDeletedAction {
  readonly type: ItemActionTypeKeys.DELETE_ITEM
  readonly payload: Item
}

export interface IItemAddedAction {
  readonly type: ItemActionTypeKeys.ADD_ITEM
  readonly payload: Item
}

export interface IItemErrorAction {
  readonly type: ItemActionTypeKeys.ITEM_ERROR
  readonly payload: string[]
}

export interface ISetTagsAction {
  readonly type: ItemActionTypeKeys.SET_TAGS
  readonly payload: ITag[]
}

type ItemActionTypes =
  | IFetchCollectionPendingAction
  | IFetchCollectionSuccessAction
  | IFetchCollectionFailureAction
  | IItemAddedAction
  | IItemDeletedAction
  | ISetTagsAction
  | IOtherAction

export default ItemActionTypes
