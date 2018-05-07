import * as React from 'react'
import { shallow } from 'enzyme'
import { ItemModal } from '../ItemModal'
import { Item } from '../../models/Item'

describe('ItemModal component', () => {
  let item: Item
  let itemModal
  let closeCallback
  let deleteCallback
  let prevCallback
  let nextCallback

  beforeEach(() => {
    item = {
      id: 1,
      title: 'one examply boy',
      url: 'http://example.com/example.png',
      uid: 2,
      tags: ['example', 'boy'],
      categories: ['png', 'image/png'],
      mediatype: 'image',
      size: 69,
    }

    closeCallback = jest.fn()
    deleteCallback = jest.fn()
    prevCallback = jest.fn()
    nextCallback = jest.fn()
    itemModal = shallow(
      <ItemModal
        item={item}
        onPrev={prevCallback}
        onNext={nextCallback}
        onClose={closeCallback}
        onDelete={deleteCallback}
      />
    )
  })

  it('should show tags for itemModal', () => {
    const tags = itemModal.find('.modalTag')
    expect(tags.length).toBe(2)
  })

  it('should show title', () => {
    const title = item.title
    expect(itemModal.contains(title)).toBe(true)
  })

  it('should call onDelete function when "trashcan icon" clicked', () => {
    const trashcan = itemModal.find('.itemDelete').first()
    trashcan.simulate('click')
    expect(deleteCallback).toHaveBeenCalledTimes(1)
  })

  it('should call onClose function when "close icon" clicked', () => {
    const clickableButton = itemModal.find('.modalClose').first()
    clickableButton.simulate('click')
    expect(closeCallback).toHaveBeenCalledTimes(1)
  })

  it('should call onNext function when "next icon" clicked', () => {
    const clickableButton = itemModal.find('.modalNext').first()
    clickableButton.simulate('click')
    expect(nextCallback).toHaveBeenCalledTimes(1)
  })
  it('should call onPrev function when "prev icon" clicked', () => {
    const clickableButton = itemModal.find('.modalPrev').first()
    clickableButton.simulate('click')
    expect(prevCallback).toHaveBeenCalledTimes(1)
  })
})
