import * as React from 'react'
import { Item } from '../models/Item'
import ItemRenderer from './ItemRenderer'
import { Modal, Button, List, Label } from 'semantic-ui-react'
import { bytesToSize } from '../utils/BytesToSize'
import { InfoModal } from './infoModal'
interface IProps {
  item: Item
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onDelete: (item) => void
}

interface IState {
  showInfo: boolean
}

export class ItemModal extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
  }

  render() {
    const { item, onClose, onNext, onPrev, onDelete } = this.props
    const { showInfo } = this.state

    /* istanbul ignore next */
    if (!item) return null

    return (
      <Modal
        className="modalView"
        size={showInfo ? 'mini' : 'large'}
        open={true}
        onClose={
          /* istanbul ignore next */
          () => {
            this.setState({ showInfo: false })
            this.props.onClose()
          }
        }
        closeIcon>
        <Modal.Header>
          {item.title}
          <Button
            className="infoButton"
            style={{ marginRight: '15px' }}
            onClick={
              /* istanbul ignore next */
              () => {
                this.setState({ showInfo: !this.state.showInfo })
              }
            }
            color="vk"
            icon="info"
            floated="left"
          />
        </Modal.Header>
        <Modal.Content image>
          {!showInfo && <ItemRenderer item={item} modalView={true} />}
          {showInfo && (
            <InfoModal
              item={item}
              onClose={onClose}
              onNext={onNext}
              onPrev={onPrev}
              onDelete={onDelete}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="prevModal"
            onClick={() => {
              this.setState({ showInfo: false })
              this.props.onPrev()
            }}
            positive
            icon="arrow left"
            labelPosition="left"
            content="previous"
            floated="left"
          />

          <Button
            className="nextModal"
            onClick={() => {
              this.setState({ showInfo: false })
              this.props.onNext()
            }}
            positive
            icon="arrow right"
            labelPosition="right"
            content="next"
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
