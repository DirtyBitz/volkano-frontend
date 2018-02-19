import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/fontawesome-free-solid'
import { BeatLoader } from 'react-spinners'

const renderField = field => {
  const { meta, type, label, asyncValidating, input, iconName } = field
  return (
    <div>
      <div id="field" className={asyncValidating ? 'async-validating' : ''}>
        <span className="icon">
          <FontAwesomeIcon icon={iconName} color="#bbb" />
        </span>
        <input {...input} type={type} id={field.id} placeholder={label} />
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

const SignInForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="text"
          component={renderField}
          label="E-Mail"
          id="email-field"
          iconName={faUser}
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
          id="pw-field"
          iconName={faLock}
        />
        <div className="buttons">
          {submitting && (
            <button type="submit" style={{ width: 100, height: 40 }}>
              <BeatLoader color="#fff" size={15} />
            </button>
          )}
          {!submitting && (
            <button type="submit" style={{ width: 100, height: 40 }}>
              Sign In
            </button>
          )}
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
    email: undefined,
    password: undefined,
  }
  if (!values.email) {
    errors.email = "E-mail can't be blank"
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
