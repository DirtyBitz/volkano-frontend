import * as React from 'react'
import { List, Button, Label } from 'semantic-ui-react'
import { Item } from '../models/Item'
import { bytesToSize } from '../utils/BytesToSize'

interface IProps {
  item: Item
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onDelete: (item) => void
}

export class InfoModal extends React.Component<IProps> {
  /* istanbul ignore next */
  private deleteItem = () => {
    const { onDelete, item } = this.props
    onDelete(item)
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
