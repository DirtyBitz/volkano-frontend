import * as React from 'react'
import { Item } from '../models/Item'
import ItemRenderer from './ItemRenderer'
import { Modal, Button, List, Label } from 'semantic-ui-react'
import { bytesToSize } from '../utils/BytesToSize'
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

  /* istanbul ignore next */
  private deleteItem = () => {
    const { onDelete, item } = this.props
    onDelete(item)
  }

  render() {
    const { item } = this.props
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
          {!showInfo && <ItemRenderer item={this.props.item} modalView={true} />}
          {showInfo && (
            <List
              size="large"
              style={{
                wordBreak: 'break-all',
              }}
              relaxed
              divided>
              <List.Item
                className="titleModal"
                icon="id badge"
                content={<p>{item.title}</p>}
              />
              <List.Item
                className="urlModal"
                icon="linkify"
                content={<a href={item.url}>{item.url}</a>}
              />
              {item.size && (
                <List.Item
                  className="sizeModal"
                  icon="hdd outline"
                  content={<div> {bytesToSize(item.size)} </div>}
                />
              )}
              <List.Item
                className="tagsModal"
                icon="tags"
                content={(item.tags || []).map(
                  /* istanbul ignore next */
                  tag => (
                    <Label
                      style={{ marginBottom: '3px' }}
                      as="a"
                      content={tag}
                      tag
                      color="teal"
                    />
                  )
                )}
              />
              <List.Item
                icon="file archive outline"
                className="categoriesModal"
                content={(item.categories || []).map(
                  /* istanbul ignore next */
                  categories => (
                    <Label
                      style={{ marginBottom: '3px' }}
                      as="a"
                      content={categories}
                      color="purple"
                      icon="info"
                    />
                  )
                )}
              />
              <List.Item
                className="deleteModal"
                content={
                  <Button
                    className="deleteModalButtonButton"
                    negative
                    icon="trash outline"
                    content="delete"
                    onClick={this.deleteItem}
                  />
                }
              />
            </List>
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
