import * as React from 'react'

interface Props {
  title: string
  url: string
}
export default class Item extends React.Component<Props> {
  render() {
    const { title, url } = this.props
    return (
      <div id="picture">
        <figure>
          <img src={url} width="250" height="175" />
          <figcaption>{title}</figcaption>
        </figure>

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
        `}</style>
      </div>
    )
  }
}
