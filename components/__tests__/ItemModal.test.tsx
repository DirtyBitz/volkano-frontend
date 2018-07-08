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
  it('should not show modal when given undefined item', () => {
    itemModal = shallow(
      <ItemModal
        item={undefined}
        onPrev={prevCallback}
        onNext={nextCallback}
        onClose={closeCallback}
        onDelete={deleteCallback}
      />
    )
    const modal = itemModal.find('.modalView')
    expect(modal.length).toBe(0)
  })

  it('should show info button', () => {
    const infoButton = itemModal.find('.infoButton')
    expect(infoButton.length).toBe(1)
  })

  it('should show title', () => {
    const title = item.title
    expect(itemModal.contains(title)).toBe(true)
  })

  it('should call onNext function when "next button" clicked', () => {
    const clickableButton = itemModal.find('.nextModal').first()
    clickableButton.simulate('click')
    expect(nextCallback).toHaveBeenCalledTimes(1)
  })

  it('should call onPrev function when "prev button" clicked', () => {
    const clickableButton = itemModal.find('.prevModal').first()
    clickableButton.simulate('click')
    expect(prevCallback).toHaveBeenCalledTimes(1)
  })
})
