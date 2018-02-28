import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ItemCard from '../ItemCard'
import { Item } from '../../models/Item'

describe('ItemCard component', () => {
  const item = {
    id: 1,
    title: 'one examply boy',
    url: 'http://example.com/example.png',
    uid: 2,
    tags: ['example', 'boy'],
    categories: ['png', 'image/png'],
  }

  it('should show tags for item', () => {
    const itemCard = shallow(<ItemCard item={item} />)
    const tags = itemCard.find('.tag')
    expect(tags.length).toBe(2)
  })
  it('should show tags for modal', () => {
    const itemCard = shallow(<ItemCard item={item} />)
    const tags = itemCard.find('.modalTag')
    expect(tags.length).toBe(2)
  })

  it('should show title', () => {
    const itemCard = shallow(<ItemCard item={item} />)
    const title = item.title
    expect(itemCard.contains(title)).toBe(true)
  })

  it('should contain a conditional image based on image type ')
})
