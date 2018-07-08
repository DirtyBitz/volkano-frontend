import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Segment } from 'semantic-ui-react'
import renderField from './InputField'

const ItemForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <div className="page">
      <Segment compact>
        <form onSubmit={handleSubmit}>
          <Field
            autoFocus
            name="url"
            type="text"
            component={renderField}
            placeholder="URL"
            id="url-field"
            iconName="copy"
          />
          <Field
            autoFocus
            name="title"
            type="text"
            component={renderField}
            placeholder="Title"
            id="title-field"
            iconName="edit"
          />
          <Field
            name="tags"
            type="text"
            component={renderField}
            placeholder="Tags (comma-separated)"
            id="tags-field"
            iconName="tags"
          />
          <Button positive loading={submitting} type="submit">
            Collect
          </Button>
        </form>
      </Segment>
      <style jsx>{`
        .page {
          display: flex;
          justify-content: space-around;
        }
        form {
          text-align: center;
          padding: 20px;
          display: table;
          margin: 0 auto;
          background-color: #e9ebed;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

const validate = values => {
  const errors = {
    url: undefined,
    title: undefined,
  }
  if (!values.url) {
    errors.url = "URL can't be blank"
  }
  if (!values.title) {
    errors.title = "Title can't be blank"
  }
  return errors
}

export default reduxForm({
  form: 'additem',
  touchOnBlur: false,
  validate,
})(ItemForm)
