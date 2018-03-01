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
      resolve([{ label: 'test', value: 'test' }])
    })
  }

  private handleAddTag = (tag: ITag) => {
    const newTag: ITag = {
      label: tag.label,
      value: tag.value || tag.label,
    }
    this.props.addTag(newTag)
  }

  render() {
    const { addTag, clearTags, removeTag, tags } = this.props
    return (
      <TagBoxAsync
        selected={tags}
        onSelect={this.handleAddTag}
        removeTag={removeTag}
        fetch={this.search}
        backspaceDelete={true}
      />
    )
  }
}
