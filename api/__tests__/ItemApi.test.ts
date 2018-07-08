import { ItemApi } from '../ItemApi'
import VolkanoRequest from '../VolkanoRequest'
import { IItemJson, Item } from '../../models/Item'
jest.mock('../VolkanoRequest')

describe('Item API', () => {
  describe('getAllItems', () => {
    it('returns an array of items', async () => {
      VolkanoRequest.get = jest.fn(() => {
        return [
          {
            id: 39,
            tags: [{ name: 'funny' }, { name: 'isak_cosplay' }],
            categories: [{ name: 'nasty-host.com' }, { name: 'audio/mp3' }],
          },
          {
            id: 40,
            tags: [{ name: 'doggo' }, { name: 'cute' }],
            categories: [{ name: 'hotto.host' }, { name: 'image/jpeg' }],
          },
        ]
      })

      const collection = await ItemApi.getItems()
      expect(collection.items).toHaveLength(2)
    })

    it('handles network errors gracefully', async () => {
      VolkanoRequest.get = jest.fn(() => {
        throw { status: 500, message: 'Server is on fire' }
      })

      try {
        await ItemApi.getItems()
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.errors).toMatch('Internal server error')
      }
    })
  })

  describe('createItem', () => {
    const title = 'new'
    const url = 'http://new'
    const tags = 'cute, doggo'

    it('sends valid parameters to backend', async () => {
      VolkanoRequest.post = jest.fn((path, params) => params.item)
      const item = await ItemApi.createItem(title, url, tags)
      expect(item.title).toEqual(title)
      expect(item.url).toEqual(url)
    })

    it('converts server json to correct format', async () => {
      const fakeItem: IItemJson = {
        id: 1,
        categories: [
          { name: 'cat1', taggings_count: 1 },
          { name: 'cat2', taggings_count: 1 },
        ],
        created_at: '123',
        mediatype: '',
        size: 123,
        tags: [{ name: 'tag1', taggings_count: 1 }, { name: 'tag2', taggings_count: 1 }],
        title: 'title',
        updated_at: '',
        url: 'http://url.com',
      }
      VolkanoRequest.post = jest.fn((path, params) => fakeItem)

      const expects: Item = {
        id: fakeItem.id,
        categories: ['cat1', 'cat2'],
        mediatype: fakeItem.mediatype,
        size: fakeItem.size,
        tags: ['tag1', 'tag2'],
        title: fakeItem.title,
        uid: fakeItem.id,
        url: fakeItem.url,
      }

      const item = await ItemApi.createItem(fakeItem.title, fakeItem.url, 'tag1, tag2')
      expect(item).toEqual(expects)
    })

    it('throws with errors for invalid item', async () => {
      VolkanoRequest.post = jest.fn(() => {
        throw {
          status: 422,
          data: { url: ["can't be blank"], title: ['has already been taken'] },
        }
      })

      try {
        await ItemApi.createItem(title, url, tags)
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.errors.url).toContain("can't be blank")
        expect(error.errors.title).toContain('has already been taken')
      }
    })

    it('handles network errors gracefully', async () => {
      VolkanoRequest.post = jest.fn(() => {
        throw { status: 500, message: 'Network Error' }
      })

      try {
        await ItemApi.createItem(title, url, tags)
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.errors).toMatch('Network error')
      }
    })

    it('knows that items are not teapots', async () => {
      VolkanoRequest.post = jest.fn(() => {
        throw { status: 418, message: "I'm a teapot" }
      })

      try {
        await ItemApi.createItem(title, url, tags)
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.errors).toMatch('Unknown server error')
      }
    })
  })

  describe('deleteItem', () => {
    it('calls adapter with correct id', async () => {
      VolkanoRequest.delete = jest.fn()

      const id = 3
      await ItemApi.deleteItem(id)
      expect(VolkanoRequest.delete).toHaveBeenCalledWith(`/items/${id}`)
    })

    it('handles errors just fine', async () => {
      VolkanoRequest.delete = jest.fn(() => {
        throw { status: 404, data: {} }
      })

      try {
        await ItemApi.deleteItem(3)
      } catch (error) {
        expect(error.errors).toMatch('No such item')
      }
    })
  })
})
