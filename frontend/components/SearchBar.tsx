import * as React from 'react'
import { TagBoxAsync } from 'react-tag-box'

const allColors = [
  'orange',
  'red',
  'aqua',
  'teal',
  'purple',
  'gray',
  'olive',
  'green',
  'lime',
  'yellow',
  'salmon',
  'rebeccapurple',
  'lightcoral',
  'deeppink',
  'burlywood',
  'cornflowerblue',
  'darkcyan',
  'greenyellow',
  'orchid',
  'violet',
  'tan',
  'slategray',
  'sienna',
  'royalblue',
]
export interface ITag {
  label: string
  value: any
}

interface IProps {
  addTag: (tag: ITag) => void
  removeTag: (tag: ITag) => void
  clearTags: () => void
  tags: ITag[]
}

export class SearchBar extends React.Component<IProps, ITag> {
  private search = (input: string) => {
    return new Promise(resolve => {
      resolve([{ label: 'test', value: 'test' }, { label: 'test2', value: 'test2' }])
    })
  }

  private handleAddTag = (tag: ITag) => {
    const newTag: ITag = {
      label: tag.label,
      value: tag.value || tag.label,
    }
    this.props.addTag(newTag)
  }

  private renderTag = (tag: any, remove: any) => {
    const hash = (s: string): number => {
      /* Simple hash function. */
      var a = 1,
        c = 0,
        h,
        o
      if (s) {
        a = 0
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
          o = s.charCodeAt(h)
          a = ((a << 6) & 268435455) + o + (o << 14)
          c = a & 266338304
          a = c !== 0 ? a ^ (c >> 21) : a
        }
      }
      return a
    }
    const color = allColors[hash(tag.label) % allColors.length]
    const tagColor = { background: `${color}` }
    const button = <button onClick={remove}>×</button>

    return (
      <li style={tagColor} key={tag.value}>
        {tag.label}
        {button}
      </li>
    )
  }

  render() {
    const { removeTag, tags } = this.props
    return (
      <div>
        <TagBoxAsync
          selected={tags}
          onSelect={this.handleAddTag}
          removeTag={removeTag}
          fetch={this.search}
          backspaceDelete={true}
          renderTag={this.renderTag}
        />
        <style global jsx>{`
          .tag-box {
            border: 1px solid #bbb;
            display: flex;
            padding: 5px;
            border-radius: 10px;
            position: relative;

            input {
              flex: 1;
              outline: none;
              padding: 4px 5px;
              border: none;
              font-size: 1em;
            }

            .autocomplete {
              position: absolute;
              left: 0;
              top: 100%;
              border: 1px solid #bbb;
              background: white;
              list-style: none;

              li.considering {
                background: pink;
              }
            }
          }
          .tag-box-pills {
            list-style: none;
            display: flex;

            li {
              margin-right: 5px;
              color: black;
              padding: 3px 5px;
              font-size: 0.85em;
              border-radius: 15px;
              border: 1px solid darkgray;
              font-weight: 600;
              font-family: tahoma, sans-serif;

              button {
                box-shadow: none;
                margin-left: 5px;
                font-size: 15px;
                border-style: none;
                border-radius: 50%;
                width: 15px;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
