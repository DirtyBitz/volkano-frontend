import * as React from 'react'
import { mount } from 'enzyme'
import InfoModal from '../InfoModal'
import { Item } from '../../models/Item'

describe('InfoModal component', () => {
  let item: Item
  let infoModal
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
      size: 12421,
    }
    closeCallback = jest.fn()
    deleteCallback = jest.fn()
    prevCallback = jest.fn()
    nextCallback = jest.fn()

    infoModal = mount(
      <InfoModal
        item={item}
        onPrev={prevCallback}
        onNext={nextCallback}
        onClose={closeCallback}
        onDelete={deleteCallback}
      />
    )
  })
  it('should call onDelete when delete button is clicked', () => {
    const clickableButton = infoModal.find('.deleteModal button')
    clickableButton.simulate('click')
    expect(deleteCallback).toHaveBeenCalledTimes(1)
  })
  it('should show categories', () => {
    const categories = infoModal.find('.categoriesModal .content').children()
    expect(categories.length).toBe(2)
  })

  it('should show tags', () => {
    const tags = infoModal.find('.tagsModal .content').children()
    expect(tags.length).toBe(2)
  })
})
