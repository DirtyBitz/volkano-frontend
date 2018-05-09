import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { ItemApi, ICollectionData } from '../../api/ItemApi'
import ItemActionTypeKeys from './ItemActionTypeKeys'
import {
  IFetchCollectionPendingAction,
  IFetchCollectionSuccessAction,
  IFetchCollectionFailureAction,
  IItemAddedAction,
  IItemDeletedAction,
  IItemErrorAction,
  ISetTagsAction,
} from './ItemActionTypes'
import { ITag } from '../../components/Collection'
import { Item } from '../../models/Item'

export const allItems = () => {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(collectionPending())
    try {
      const collection = await ItemApi.getAllItems()
      dispatch(collectionSuccess(collection))
    } catch (error) {
      dispatch(collectionFailure(error))
    }
  }
}

export const createItem = item => {
  return async (dispatch: Dispatch<IStoreState>) => {
    const { title, url, tags } = item
    try {
      const newItem = await ItemApi.createItem(title, url, tags)
      dispatch(addItem(newItem))
    } catch (error) {
      dispatch(itemError(error))
      throw error
    }
  }
}

export const removeItem = item => {
  return async (dispatch: Dispatch<IStoreState>) => {
    const { id } = item
    try {
      await ItemApi.deleteItem(id)
      dispatch(deleteItem(item))
    } catch (error) {
      dispatch(itemError(error))
    }
  }
}

export const collectionPending = (): IFetchCollectionPendingAction => ({
  type: ItemActionTypeKeys.FETCHING_COLLECTION,
})

export const collectionSuccess = (
  data: ICollectionData
): IFetchCollectionSuccessAction => ({
  type: ItemActionTypeKeys.FETCH_COLLECTION_SUCCESS,
  payload: data,
})

export const collectionFailure = (error: string[]): IFetchCollectionFailureAction => ({
  type: ItemActionTypeKeys.FETCH_COLLECTION_FAILURE,
  payload: error,
})

export const addItem = (item: Item): IItemAddedAction => ({
  type: ItemActionTypeKeys.ADD_ITEM,
  payload: item,
})

export const deleteItem = (item: Item): IItemDeletedAction => ({
  type: ItemActionTypeKeys.DELETE_ITEM,
  payload: item,
})

export const itemError = (error: string[]): IItemErrorAction => ({
  type: ItemActionTypeKeys.ITEM_ERROR,
  payload: error,
})

export const setTags = (tags: ITag[]): ISetTagsAction => ({
  type: ItemActionTypeKeys.SET_TAGS,
  payload: tags,
})
