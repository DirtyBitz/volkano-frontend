import * as React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const renderField = field => {
  const { meta, type, asyncValidating, input, iconName, placeholder } = field
  return (
    <div>
      <div id="field" className={asyncValidating ? 'async-validating' : ''}>
        <span className="icon">
          <FontAwesomeIcon icon={iconName} color="#bbb" />
        </span>
        <input {...input} type={type} id={field.id} placeholder={placeholder} />
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

export default renderField
