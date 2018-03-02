import * as React from 'react'
import { TagBoxAsync } from 'react-tag-box'

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

export class SearchBar extends React.Component<IProps, IState> {
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
    const button = <button onClick={remove}>X</button>

    return (
      <li key={tag.value}>
        {tag.label}
        {button}
      </li>
    )
  }

  render() {
    const { addTag, clearTags, removeTag, tags } = this.props
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
            border-radius: 3px;
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
              background: #e2e2e2;
              padding: 3px 5px;
              font-size: 0.85em;
              border-radius: 3px;
              border: 1px solid #bababa;
            }
          }
        `}</style>
      </div>
    )
  }
}
