import * as React from 'react'
import { List, Button, Label, Popup } from 'semantic-ui-react'
import { Item } from '../models/Item'
import { bytesToSize } from '../utils/BytesToSize'

interface IProps {
  item: Item
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onDelete: (item) => void
}

interface IState {
  isOpen: boolean
}
export class InfoModal extends React.Component<IProps, IState> {
  timeout: any
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, 2500)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }
  /* istanbul ignore next */
  private deleteItem = () => {
    const { onDelete, item } = this.props
    onDelete(item)
  }
  private copyUrl = () => {
    const range = document.createRange()
    range.selectNode(document.getElementById('urlLink'))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
  }
  render() {
    const { item } = this.props
    return (
      <List
        size="large"
        style={{
          wordBreak: 'break-all',
        }}
        relaxed
        divided>
        <List.Item className="titleModal" icon="id badge" content={<p>{item.title}</p>} />
        <List.Item
          className="urlModal"
          icon="linkify"
          content={
            <Popup
              inverted
              wide="very"
              trigger={
                <div>
                  <a id="urlLink" href={item.url}>
                    {item.url}{' '}
                  </a>
                  <Button
                    icon="copy"
                    onClick={this.copyUrl}
                    floated="right"
                    size="mini"
                  />
                </div>
              }
              content={`Link was copied to your clipboard!`}
              on="click"
              open={this.state.isOpen}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              position="top right"
            />
          }
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
                key={tag}
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
            category => (
              <Label
                key={category}
                style={{ marginBottom: '3px' }}
                as="a"
                content={category}
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
              className="deleteModalButton"
              negative
              icon="trash outline"
              content="delete"
              onClick={this.deleteItem}
            />
          }
        />
      </List>
    )
  }
}
