import newInstance from './create-dialog'

let dialogInstance

export default {
  getInstance (render = undefined, lockScroll = true) {
    this.dialogInstance = this.dialogInstance || newInstance({
      closable: false,
      maskClosable: false,
      footerHide: true,
      render: render,
      lockScroll
    })

    return this.dialogInstance
  },
  show (options) {
    const render = ('render' in options) ? options.render : undefined
    const lockScroll = ('lockScroll' in options) ? options.lockScroll : true
    const instance = this.getInstance(render, lockScroll)

    options.onRemove = () => {
      this.dialogInstance = null
    }

    instance.show(options)
  },
  info (props = {}) {
    if (typeof props === 'object') {
      props.icon = 'info'
      props.showCancel = false
    }

    return this.show(props)
  },

  success (props = {}) {
    props.icon = 'success'
    props.showCancel = false
    return this.show(props)
  },

  warning (props = {}) {
    props.icon = 'warning'
    props.showCancel = false
    return this.show(props)
  },
  error (props = {}) {
    props.icon = 'error'
    props.showCancel = false
    return this.show(props)
  },
  confirm (props = {}) {
    props.icon = 'confirm'
    props.showCancel = true
    return this.show(props)
  },
  remove () {
    if (!dialogInstance) { // at loading status, remove after Cancel
      return false
    }

    const instance = getModalInstance()

    instance.remove()
  },
  install (app, _) {
    app.config.globalProperties.$Dialog = this
  }
}
