import * as React from 'react'
import { Field, reduxForm } from 'redux-form'

interface IProps {
  handleSubmit: (event) => void
  pristine: boolean
  reset: (event) => void
  submitting: boolean
}

class SigninForm extends React.Component<IProps> {
  private renderField = ({
    input,
    label,
    type,
    meta: { asyncValidating, touched, error },
  }) => (
    <div>
      <label>{label}</label>
      <div className={asyncValidating ? 'async-validating' : ''}>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={this.renderField}
          label="Username"
        />

        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Password"
        />

        <div>
          <button type="submit" disabled={submitting}>
            Signin
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  console.log('asyncValidate', values)
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      console.log('Ops!')
      throw { username: 'That username is taken' }
    }
  })
}

const validate = values => {
  console.log('validate', values)
  const errors = {}
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
  //asyncValidate,
  asyncBlurFields: ['username'],
})(SigninForm)
