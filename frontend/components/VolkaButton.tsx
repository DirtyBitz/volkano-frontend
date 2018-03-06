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
  onClick: () => void
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

  render() {
    const { title, disabled, icon, isLoading } = this.props
    const onClick = disabled || isLoading ? () => {} : this.props.onClick
    const className = this.selectClassName()

    console.log(this.state.buttonWidth)

    return (
      <div>
        <button
          className={className.join(' ')}
          onClick={onClick}
          ref={ref => (this.button = ref)}>
          {icon &&
            !isLoading && (
              <span className="button-icon">
                <FontAwesomeIcon icon={icon} color="#fff" />
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
