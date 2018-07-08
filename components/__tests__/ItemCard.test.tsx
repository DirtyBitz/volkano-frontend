import * as React from 'react'
import { shallow } from 'enzyme'
import ItemCard from '../ItemCard'
import { Item } from '../../models/Item'

describe('ItemCard component', () => {
  let itemCard
  let callback
  let item: Item

  beforeEach(() => {
    item = {
      id: 1,
      title: 'one examply boy',
      url: 'http://example.com/example.png',
      uid: 2,
      tags: ['example', 'boy'],
      categories: ['png', 'image/png'],
      mediatype: 'image',
      size: 12421,
    }
    callback = jest.fn()
    itemCard = shallow(<ItemCard item={item} onSelect={callback} />)
  })

  it('should show title', () => {
    const title = item.title
    expect(itemCard.contains(title)).toBe(true)
  })

  it('should call onselect function when clicked', () => {
    const clickableDiv = itemCard.find('.item').first()
    clickableDiv.simulate('click')
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
