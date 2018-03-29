import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { faUser, faLock } from '@fortawesome/fontawesome-free-solid'
import renderField from './InputField'
import { VolkaButton } from './VolkaButton'

const SignInForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <Field
          name="login"
          type="text"
          component={renderField}
          placeholder="E-Mail / Nickname"
          id="login-field"
          iconName={faUser}
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          placeholder="Password"
          id="pw-field"
          iconName={faLock}
        />
        <div className="buttons">
          <VolkaButton primary title="Sign in" type="submit" isLoading={submitting} />
        </div>
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

        button {
          padding: 10px 20px;
          font-size: 1em;
          background-color: rgba(#54b45f, 0.8);
          color: white;
          font-family: 'Montserrat', sans-serif;
          border-radius: 10px;
          cursor: pointer;
          border: 0;
        }
        button:hover {
          background-color: rgba(#54b45f, 1);
        }
      `}</style>
    </div>
  )
}

const validate = values => {
  const errors = {
    login: undefined,
    password: undefined,
  }
  if (!values.login) {
    errors.login = "E-mail / nickname can't be blank"
  }
  if (!values.password) {
    errors.password = "Password can't be blank"
  }
  return errors
}

export default reduxForm({
  form: 'signin',
  validate,
  asyncBlurFields: ['username'],
})(SignInForm)
