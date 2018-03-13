import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { faUser, faLock, faIdBadge } from '@fortawesome/fontawesome-free-solid'
import renderField from './InputField'
import { VolkaButton } from './VolkaButton'

const SignUpForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <div>
      <div className="page">
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            type="text"
            component={renderField}
            id="email-field"
            iconName={faUser}
            placeholder="E-Mail"
          />
          <Field
            name="nickname"
            type="text"
            component={renderField}
            id="nickname-field"
            iconName={faIdBadge}
            placeholder="Nickname"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            id="pw-field"
            iconName={faLock}
            placeholder="Password"
          />
          <Field
            name="passwordConfirmation"
            type="password"
            component={renderField}
            id="pw-confirm-field"
            iconName={faLock}
            placeholder="Confirm password"
          />
          <div className="buttons">
            <VolkaButton primary title="Sign up" type="submit" />
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
    errors.email = "E-mail can't be blank"
  }
  if (!values.password) {
    errors.password = "Password can't be blank"
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'This field should match the previous password field.'
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
