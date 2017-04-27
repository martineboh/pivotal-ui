import React from 'react'
import PropTypes from 'prop-types';
import 'pui-css-tooltips'
import classnames from 'classnames'

export class Tooltip extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    size: PropTypes.oneOf(['auto','sm', 'md', 'lg'])
  }

  static defaultProps = {
    visible: true,
    size: 'auto'
  }

  constructor(props) {
    super(props)
  }

  render() {
    let {visible, size, className, children, ...others} = this.props

    const newClasses = classnames('tooltip-container', visible ? 'tooltip-container-visible' : 'tooltip-container-hidden',
                                  size === 'auto' ? null : `tooltip-${size}`,
                                  className)

    return (
      <div className={newClasses} {...others}>
        <div className="tooltip-content">{children}</div>
      </div>
    )
  }
}

export class TooltipTrigger extends React.Component {
  static propTypes = {
    tooltip: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    trigger: PropTypes.oneOf(['hover', 'click']),
    clickHideDelay: PropTypes.number,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    theme: PropTypes.oneOf(['dark', 'light']),
    size: PropTypes.oneOf(['auto', 'sm', 'md', 'lg'])
  }

  static defaultProps = {
    placement: 'top',
    trigger: 'hover',
    clickHideDelay: 1000,
    onEntered: () => {},
    onExited: () => {},
    theme: 'dark',
    size: 'auto'
  }

  constructor(props) {
    super(props)
    this.state = {visible: false}
  }

  hoverHandler(e) {
    this.setState({visible: e.type === 'mouseenter'})
  }

  clickHandler() {
    this.setState({visible: true})
    setTimeout(() => {
      this.setState({visible: false})
    }, this.props.clickHideDelay)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.visible && !this.state.visible) {
      this.props.onExited()
    } else if(!prevState.visible && this.state.visible) {
      this.props.onEntered()
    }
  }

  render() {
    const {placement, tooltip, trigger, className, clickHideDelay, onEntered, onExited, theme, size, ...others} = this.props
    const {visible} = this.state

    let placementClass
    if(placement != 'top') {
      placementClass = `tooltip-${placement}`
    }

    let triggerHandler
    switch(trigger) {
      case 'click':
        triggerHandler = {onClick: this.clickHandler.bind(this)}
        break
      default:
        triggerHandler = {
          onMouseEnter: this.hoverHandler.bind(this),
          onMouseLeave: this.hoverHandler.bind(this)
        }
        break
    }

    const newClasses = classnames('tooltip', className, placementClass,
      theme === 'light' ? 'tooltip-light' : null)
    const newProps = Object.assign({className: newClasses}, triggerHandler, others)

    return (
      <div {...newProps}>
        {this.props.children}
        <Tooltip size={this.props.size} visible={visible}>{tooltip}</Tooltip>
      </div>
    )
  }
}