import * as React from 'react'
import { Colors } from '../constants/Colors'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { BeatLoader } from 'react-spinners'

interface IProps {
  title: string
  primary?: boolean
  disabled?: boolean
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
    if (this.props.primary) classNames.push('primary')
    if (this.props.disabled) classNames.push('disabled')
    if (this.props.icon) classNames.push('with-icon')
    if (this.props.isLoading) classNames.push('loading')
    return classNames
  }

  componentDidMount() {
    if (this.button && this.button.clientWidth) {
      this.setState({
        buttonWidth: this.button.clientWidth + 1 + 'px',
      })
    }
  }

  private getOnClickFunction = () => {
    const { disabled, isLoading } = this.props
    let onClick = this.props.onClick || function() {}
    if (disabled || isLoading) return () => {}
    return onClick
  }

  render() {
    const { title, disabled, icon, isLoading, type } = this.props
    const onClick = this.getOnClickFunction()
    const className = this.selectClassName()

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
              <span className="button-icon">
                <FontAwesomeIcon className="fa-icon" icon={icon} color="#fff" />
              </span>
            )}
          {isLoading && <BeatLoader color="#fff" size={5} />}
          {!isLoading && title}
        </button>
        <style jsx>{`
          button {
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            background: rgba(#6d9eff, 0.8);
            color: white;
            transition: background 0.3s;
            outline: none;
            width: ${this.state.buttonWidth ? this.state.buttonWidth : 'auto'};
            white-space: nowrap;
            &:hover {
              cursor: pointer;
              background: #6d9eff;
            }
          }

          .primary {
            background: ${Colors.primary};

            &:hover {
              background: ${Colors.primaryHover};
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
        `}</style>
      </div>
    )
  }
}
