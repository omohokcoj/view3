import newInstance from './create-message'

const prefixCls = 'ivu-message'
const iconPrefixCls = 'ion'
const prefixKey = 'ivu_message_key_'

const defaults = {
  top: 24,
  duration: 1.5
}

let name = 1

const iconTypes = {
  info: 'ios-information-circle',
  success: 'ios-checkmark-circle',
  warning: 'ios-alert',
  error: 'ios-close-circle',
  loading: 'ios-loading'
}

export default {
  info (options) {
    return this.message('info', options)
  },
  success (options) {
    return this.message('success', options)
  },
  warning (options) {
    return this.message('warning', options)
  },
  error (options) {
    return this.message('error', options)
  },
  loading (options) {
    return this.message('loading', options)
  },
  message (type, options) {
    if (typeof options === 'string') {
      options = {
        content: options
      }
    }
    return this.notice(options.content, options.duration, type, options.onClose, options.closable, options.render, options.background)
  },
  getMessageInstance () {
    this.messageInstance = this.messageInstance || newInstance({
      prefixCls: prefixCls,
      styles: {
        top: `${defaults.top}px`
      }
    })

    return this.messageInstance
  },
  notice (content = '', duration = defaults.duration, type, onClose = function () {}, closable = false, render = function () {}, background = false) {
    const iconType = iconTypes[type]

    // if loading
    const loadCls = type === 'loading' ? ' ivu-load-loop' : ''

    const instance = this.getMessageInstance()

    instance.notice({
      name: `${prefixKey}${name}`,
      duration: duration,
      styles: {},
      transitionName: 'move-up',
      content: `
            <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
                <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType} ${loadCls}"></i>
                <span>${content}</span>
            </div>
        `,
      render: render,
      onClose: onClose,
      closable: closable,
      type: 'message',
      msgType: type,
      background: background
    })

    return (function () {
      const target = name++

      return function () {
        instance.remove(`${prefixKey}${target}`)
      }
    })()
  },
  config (options) {
    if (options.top || options.top === 0) {
      defaults.top = options.top
    }
    if (options.duration || options.duration === 0) {
      defaults.duration = options.duration
    }
  },
  destroy () {
    const instance = getMessageInstance()
    this.messageInstance = null
    instance.destroy('ivu-message')
  },
  install (app, _) {
    app.config.globalProperties.$Message = this
  }
}
