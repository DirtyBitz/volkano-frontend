import ItemActionTypeKeys from './ItemActionTypeKeys'
import { IOtherAction } from '../IOtherAction'
import { ICollectionData } from '../../api/ItemApi'
import { ITag } from '../../components/SearchBar'
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
  | IFetchCollectionPendingAction
  | IFetchCollectionSuccessAction
  | IFetchCollectionFailureAction
  | IItemAddedAction
  | IItemDeletedAction
  | IAddTagAction
  | IRemoveTagAction
  | IClearTagsAction
  | IOtherAction

export default ItemActionTypes
