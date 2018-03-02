import * as React from 'react'
import { TagBoxAsync } from 'react-tag-box'
import { tagColors, hashTag } from '../utils/TagColors'

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
    const color = tagColors[hashTag(tag.label) % tagColors.length]
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
        <style jsx global>{`
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
                text-align: center;
                margin-left: 5px;
                font-size: 15px;
                border-style: none;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.3);
                width: 15px;
                font-family: 'Roboto', sans-serif;
                transition: background 0.5s ease;
              }
              button:hover {
                background: rgba(0, 0, 0, 0.5);
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
