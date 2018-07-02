import * as React from 'react'
import { Input } from 'semantic-ui-react'

const renderField = field => {
  const { meta, type, asyncValidating, input, iconName, placeholder, autoFocus } = field
  const empty = !input.value

  return (
    <div>
      <div id="field" className={asyncValidating ? 'async-validating' : ''}>
        <Input
          icon={iconName}
          iconPosition="left"
          placeholder={placeholder}
          type={type}
          autoFocus={empty && autoFocus}
          error={meta.touched && meta.invalid}
          {...input}
        />
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
          margin-bottom: 15px;
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

export default renderField
