import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCopy, faEdit, faTags } from '@fortawesome/fontawesome-free-solid'
import { Button } from 'semantic-ui-react'

const renderField = field => {
  const { meta, type, label, asyncValidating, input, iconName, inputValue } = field
  return (
    <div>
      <div id="field" className={asyncValidating ? 'async-validating' : ''}>
        <span className="icon">
          <FontAwesomeIcon icon={iconName} color="#bbb" />
        </span>
        <input
          {...input}
          type={type}
          id={field.id}
          value={inputValue}
          placeholder={label}
        />
        {meta.touched &&
          meta.error && (
            <div className="validation-error">
              <span>{meta.error}</span>
            </div>
          )}
      </div>
      <style jsx>{`
        #field {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 15px;

          .icon {
            background: #fff;
            padding: 10px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            width: 40px;
            text-align: center;
          }
        }
        input {
          padding: 10px;
          font-size: 15px;
          font-family: 'Montserrat', sans-serif;
          border: 0;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          border-left: 1px solid #f9f9f9;
          outline: none;
        }
        .validation-error {
          display: flex;
          position: absolute;
          left: calc(100% + 10px);
          top: 0;
          height: 100%;
          align-items: center;
          span {
            background: rgba(163, 0, 0, 0.75);
            color: #fff;
            border-radius: 5px;
            padding: 5px;
            animation: fadein 0.5s;
            white-space: nowrap;
          }

          @keyframes fadein {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  )
}

const ItemForm = props => {
  const { handleSubmit, submitting, url, title, tags } = props
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <Field
          name="url"
          type="text"
          component={renderField}
          label="URL"
          id="url-field"
          iconName={faCopy}
          inputValue={url}
        />
        <Field
          name="title"
          type="text"
          component={renderField}
          label="Title"
          id="title-field"
          iconName={faEdit}
          inputValue={title}
        />
        <Field
          name="tags"
          type="text"
          component={renderField}
          label="Tags (comma-separated)"
          id="tags-field"
          iconName={faTags}
          inputValue={tags}
        />
        <Button positive loading={submitting} type="submit">
          Collect
        </Button>
      </form>

      <style jsx>{`
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
  validate,
})(ItemForm)
