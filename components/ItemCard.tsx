import * as React from 'react'
import { Item } from '../models/Item'
import ItemRenderer from './ItemRenderer'
import { Card } from 'semantic-ui-react'

interface IProps {
  item: Item
  onSelect: (item: Item) => void
}
export default class ItemCard extends React.Component<IProps> {
  onClick = () => {
    this.props.onSelect(this.props.item)
  }
  render() {
    return (
      <div className="item" onClick={this.onClick}>
        <Card className="ui card" color="red">
          <Card.Header>{this.props.item.title}</Card.Header>
          <Card.Content>
            <div className="ui medium image">{this.renderItem()}</div>
          </Card.Content>
        </Card>
        <style jsx>{`
          .ui.card {
            border: 10px solid red;
            background-color: #447cd6;
          }
          .ui.red.card > .content {
            padding: 0px;
            background-color: #447cd6;
            border: 1px solid red;
          }
          .item {
            width: 300px;
            margin: 15px;
            border-radius: 5px;
            cursor: pointer;
            padding-bottom: 5px;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          .item:hover {
            transform: scale(1.05);
          }
          @media (hover: none) {
            .item:hover {
              transform: none;
            }
          }
        `}</style>
      </div>
    )
  }
  private renderItem = () => {
    return (
      <div className="image-container">
        {<ItemRenderer item={this.props.item} />}
        <style jsx>{`
          .image-container {
            height: 175px;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}
