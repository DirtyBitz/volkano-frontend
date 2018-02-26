import * as React from 'react'
import { Item } from '../models/Item'

interface Props {
  item: Item
}
export default class ItemCard extends React.Component<Props> {
  render() {
    const { url, title, tags, id } = this.props.item
    return (
      <div key={id} id="picture">
        <figure>
          <img src={url} width="250" height="175" />
          <figcaption>{title}</figcaption>
        </figure>
        <ul>
          {tags &&
            tags.map((tag: string) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
        </ul>

        <style jsx>{`
          #picture {
            text-align: center;
            display: inline-block;
            margin: 5px;
            border: 2px solid black;
            border-radius: 15px;
            background-color: #e9ebed;
          }
          img {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }
          .tag {
            background-color: gray;
          }
        `}</style>
      </div>
    )
  }
}
