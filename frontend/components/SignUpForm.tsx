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

const SignUpForm = props => {
  const { handleSubmit, pristine, reset, submitting, errors } = props
  return (
    <div>
      <div className="errors" style={{ color: 'red', marginBottom: 15, fontSize: 10 }}>
        {errors &&
          errors.map((error, i) => (
            <div key={i} className="error">
              {error}
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Field name="email" type="text" component={renderField} label="E-mail" />
        <Field name="nickname" type="text" component={renderField} label="Nickname" />
        <Field name="password" type="password" component={renderField} label="Password" />
        <Field
          name="password-confirmation"
          type="password"
          component={renderField}
          label="Password confirmation"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Sign up!
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear values
          </button>
        </div>
      </form>
    </div>
  )
}

const validate = values => {
  const errors = {
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
  }

  if (!values.email) {
    errors.email = 'This field is required'
  }
  if (!values.password) {
    errors.password = 'This field is required'
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation =
      'This field is required and should match the previous password field.'
  }
  if (values.password < 6) {
    errors.password = 'The password needs to be at least 6 characters long'
  }
  if (values.password != values.passwordConfirmation) {
    errors.passwordConfirmation = "Passwords don't match"
  }
  if (values.email) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!re.test(values.email)) {
      errors.email = 'Invalid e-mail'
    }
  }
  return errors
}

export default reduxForm({
  form: 'signup',
  validate,
  asyncBlurFields: ['email'],
})(SignUpForm)
