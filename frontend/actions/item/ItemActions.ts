import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { ItemApi, ICollectionData } from '../../api/ItemApi'
import ItemActionTypeKeys from './ItemActionTypeKeys'
import {
  IItemPendingAction,
  IItemFulfilledAction,
  IItemRejectedAction,
  IAddTagAction,
  IRemoveTagAction,
  IClearTagsAction,
} from './ItemActionTypes'
import { ITag } from '../../components/SearchBar'

export const allItems = () => {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(itemPending())
    try {
      const response = await ItemApi.getAllItems()
      dispatch(itemSuccess(response))
    } catch (error) {
      dispatch(itemError(error))
    }
  }
}

export const createItem = item => {
  return async (dispatch: Dispatch<IStoreState>) => {
    const { title, url, tags } = item
    try {
      await ItemApi.createItem(title, url, tags)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteItem = item => {
  return async (dispatch: Dispatch<IStoreState>) => {
    const { id } = item
    try {
      await ItemApi.deleteItem(id)
    } catch (error) {
      console.log(error)
    }
  }
}

export const itemPending = (): IItemPendingAction => ({
  type: ItemActionTypeKeys.ITEM_PENDING,
})

export const itemSuccess = (data: ICollectionData): IItemFulfilledAction => ({
  type: ItemActionTypeKeys.ITEM_FULFILLED,
  payload: data,
})

export const itemError = (error: string[]): IItemRejectedAction => ({
  type: ItemActionTypeKeys.ITEM_REJECTED,
  payload: error,
})

export const addTag = (tag: ITag): IAddTagAction => ({
  type: ItemActionTypeKeys.ADD_TAG,
  payload: tag,
})

export const removeTag = (tag: ITag): IRemoveTagAction => ({
  type: ItemActionTypeKeys.REMOVE_TAG,
  payload: tag,
})

export const clearTags = (): IClearTagsAction => ({
  type: ItemActionTypeKeys.CLEAR_TAGS,
})
