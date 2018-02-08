import * as React from 'react'
import { Field, reduxForm } from 'redux-form'

interface IProps {
  handleSubmit: (event) => void
  pristine: boolean
  reset: (event) => void
  submitting: boolean
  errors: string[]
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
        {touched &&
          error && (
            <span style={{ marginLeft: 10, color: 'red', fontSize: 9 }}>{error}</span>
          )}
      </div>
    </div>
  )

  render() {
    const { handleSubmit, pristine, reset, submitting, errors } = this.props

    return (
      <div>
        <div className="errors" style={{ color: 'red', marginBottom: 15, fontSize: 10 }}>
          {errors && errors.map(error => <div className="error">{error}</div>)}
        </div>

        <form onSubmit={handleSubmit}>
          <Field
            //@ts-ignore
            name="username"
            type="text"
            component={this.renderField}
            label="Username"
          />

          <Field
            //@ts-ignore
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
      </div>
    )
  }
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
  //@ts-ignore
})(SigninForm)
