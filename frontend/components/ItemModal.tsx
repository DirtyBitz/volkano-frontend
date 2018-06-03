import * as React from 'react'
import { Item } from '../models/Item'
import ItemRenderer from './ItemRenderer'
import { Modal, Button } from 'semantic-ui-react'

interface IProps {
  item: Item
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onDelete: (item) => void
}

export class ItemModal extends React.Component<IProps> {
  private deleteItem = () => {
    const { onDelete, item } = this.props
    onDelete(item)
  }

  render() {
    const { item } = this.props

    if (!item) return null

    return (
      <div id="modal">
        <Modal
          size="large"
          open={item ? true : false}
          onClose={this.props.onClose}
          closeIcon>
          <Modal.Header>
            {item.title}
            <Button
              style={{ marginRight: '15px' }}
              onClick={this.props.onPrev}
              color="vk"
              icon="info"
              floated="left"
            />
          </Modal.Header>
          <Modal.Content image>
            <ItemRenderer item={this.props.item} modalView={true} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.props.onPrev}
              positive
              icon="arrow left"
              labelPosition="left"
              content="previous"
              floated="left"
            />

            <Button
              onClick={this.props.onNext}
              positive
              icon="arrow right"
              labelPosition="right"
              content="next"
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
