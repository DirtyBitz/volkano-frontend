import * as React from 'react'
import { Colors } from '../constants/Colors'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { BeatLoader } from 'react-spinners'

interface IProps {
  title?: string
  className?: string
  disabled?: boolean
  ghost?: boolean
  icon?: any
  isLoading?: boolean
  onClick?: () => void
  type?: 'submit'
}

interface IState {
  buttonWidth?: string
}

export class VolkaButton extends React.Component<IProps, IState> {
  button: any

  constructor(props) {
    super(props)
    this.state = {
      buttonWidth: undefined,
    }
  }

  private selectClassName() {
    const classNames = []
    if (this.props.className) classNames.push(this.props.className)
    if (this.props.disabled) classNames.push('disabled')
    if (this.props.icon && this.props.title) classNames.push('with-icon')
    if (this.props.isLoading) classNames.push('loading')
    if (this.props.ghost) classNames.push('ghost')
    return classNames
  }

  componentDidMount() {
    /* istanbul ignore next */
    if (this.button && this.button.clientWidth) {
      this.setState({
        buttonWidth: `${this.button.clientWidth + 1}px`,
      })
    }
  }

  private getOnClickFunction = () => {
    const { disabled, isLoading } = this.props
    const noOp = () => {}

    if (disabled || isLoading) return noOp

    const onClick = this.props.onClick || noOp
    return onClick
  }

  render() {
    const { title, disabled, icon, isLoading, type } = this.props
    const onClick = this.getOnClickFunction()
    const className = this.selectClassName()

    const fontClassName = title ? 'button-icon' : ''
    /* istanbul ignore next */
    return (
      <div>
        <button
          className={className.join(' ')}
          onClick={onClick}
          ref={ref => (this.button = ref)}
          type={type}
          disabled={disabled}>
          {icon &&
            !isLoading && (
              <span className={fontClassName}>
                <FontAwesomeIcon className="fa-icon" icon={icon} color="#fff" />
              </span>
            )}
          {isLoading && <BeatLoader color="#fff" size={5} />}
          {!isLoading && title !== '' && title}
        </button>
        <style jsx>{`
          button {
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            background: ${Colors.defaultButton};
            color: white;
            transition: background 0.3s;
            outline: none;
            width: ${this.state.buttonWidth || 'auto'};
            white-space: nowrap;

            &:hover {
              cursor: pointer;
              background: ${Colors.defaultHover};
            }
          }

          .danger {
            background: ${Colors.dangerButton};

            &:hover {
              background: ${Colors.dangerHover};
            }
          }
          .button-icon {
            margin-right: 6px;
          }

          .disabled,
          .loading {
            background: ${Colors.disabledButton};

            &:hover {
              background: ${Colors.disabledButton};
              cursor: not-allowed;
            }
          }

          .ghost {
            border: 1px solid rgba(255, 255, 255, 0.75);
            color: #fff;
            background: transparent;

            &:hover {
              background: rgba(255, 255, 255, 0.4);
              color: #222;
            }
          }
        `}</style>
      </div>
    )
  }
}
