import * as React from 'react'
import { Field, reduxForm } from 'redux-form'

const renderField = field => {
  const { meta, type, label, asyncValidating, input } = field
  return (
    <div>
      <label>{label}</label>
      <div className={asyncValidating ? 'async-validating' : ''}>
        <input {...input} type={type} placeholder={label} />
        {meta.touched &&
          meta.error && <span style={{ color: 'red', fontSize: 10 }}>{meta.error}</span>}
      </div>
    </div>
  )
}

const SignInForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <div>
        <button type="submit" disabled={submitting}>
          Sign Up
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

const validate = values => {
  const errors = {
    username: undefined,
    password: undefined,
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'signin',
  validate,
  asyncBlurFields: ['username'],
})(SignInForm)
