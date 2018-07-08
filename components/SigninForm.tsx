import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField from './InputField'
import { Segment, Button } from 'semantic-ui-react'

const SignInForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <div className="page">
      <Segment compact className="sign-in-form">
        <form onSubmit={handleSubmit} className="redux-sign-in-form">
          <Field
            autoFocus
            name="login"
            type="text"
            component={renderField}
            placeholder="E-Mail / Nickname"
            id="login-field"
            iconName="user"
          />
          <Field
            autoFocus
            name="password"
            type="password"
            component={renderField}
            placeholder="Password"
            id="pw-field"
            iconName="lock"
          />
          <Button positive loading={submitting} type="submit">
            Sign in
          </Button>
        </form>
      </Segment>
      <style jsx>{`
        .page {
          display: flex;
          justify-content: space-around;
        }

        .redux-sign-in-form {
          display: flex;
          flex-direction: column;
          align-items: center;
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
  touchOnBlur: false,
  validate,
  asyncBlurFields: ['username'],
})(SignInForm)
