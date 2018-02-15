import * as React from 'react'
import { Field, reduxForm } from 'redux-form'

const renderField = field => {
  const { meta, type, label, asyncValidating, input } = field
  return (
    <div>
      <label>{label}</label>
      <div className={asyncValidating ? 'async-validating' : ''}>
        <input {...input} type={type} />
        {meta.touched &&
          meta.error && (
            <span
              style={{ color: 'red', fontSize: 10, display: 'block', padding: '3px' }}>
              {meta.error}
            </span>
          )}
      </div>
    </div>
  )
}

const SignInForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <Field name="email" type="text" component={renderField} label="E-Mail" />
        <Field name="password" type="password" component={renderField} label="Password" />
        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Sign In
          </button>
        </div>
      </form>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat');
        form {
          text-align: center;
          padding: 20px;
          display: table;
          margin: 0 auto;
        }
        button {
          margin: 10px;
          padding: 2px;
          background-color: #ce1a1a;
          color: white;
          font-family: 'Montserrat', sans-serif;
          width: 50px;
          height: 25px;
          border-radius: 10px;
        }
        button:hover {
          background-color: #a02424;
        }
        .page {
          border: 2px solid #bcbcbc;
          background-color: #e9ebed;
          border-radius: 25px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
        }
      `}</style>
    </div>
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
