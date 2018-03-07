import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faLock, faIdBadge } from '@fortawesome/fontawesome-free-solid'
import renderField from './InputField'
import { VolkaButton } from './VolkaButton'

const EditProfileForm = props => {
  const { handleSubmit } = props
  return (
    <div>
      <div className="page">
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            type="text"
            component={renderField}
            id="e-mail-field"
            placeholder="E-mail"
          />

          <Field
            name="nickname"
            type="text"
            component={renderField}
            placeholder="Nickname"
          />

          <div>
            <VolkaButton primary title="Edit profile" />
          </div>
        </form>
        <style jsx>{`
          form {
            text-align: center;
            padding: 20px;
            display: table;
            margin: 0 auto;
            border-radius: 10px;
          }
          input {
            background-color: #e9ebed !important;
          }
        `}</style>
      </div>
    </div>
  )
}

const validate = values => {
  const errors = {
    nickname: undefined,
    email: undefined,
  }

  if (!values.nickname) {
    errors.nickname = "Nickname can't be blank"
  }
  if (!values.email) {
    errors.email = "E-mail can't be blank"
  }
  return errors
}

export default reduxForm({
  form: 'EditProfile',
  validate,
  asyncBlurFields: ['username', 'email'],
})(EditProfileForm)
