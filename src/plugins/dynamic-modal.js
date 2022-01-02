import createInstance from './create-modal'
import ModalComponent from '../components/modal'

const defaultOptions = {
  width: 620,
  closable: false,
  footerHide: true
}

class DynamicModalClass {
  open (component, props, opts) {
    const options = { ...defaultOptions, ...opts }
    const instance = this.getModalInstance(component, props, options)

    instance.show(options)
  }

  remove () {
    if (this.modalInstance) {
      const instance = this.getModalInstance()

      instance.remove()

      this.modalInstance = null
    }
  }

  getModalInstance (component, props, options) {
    this.modalInstance = this.modalInstance || createInstance(
      this.app,
      ModalComponent,
      options,
      (h) => h(component, { ...props }),
      () => {
        if (options.onClose) options.onClose()
        this.modalInstance = null
      }
    )

    return this.modalInstance
  }

  install (app, _) {
    this.app = app

    app.config.globalProperties.$Modal = this

    if (app.config.globalProperties.$router) {
      app.config.globalProperties.$router.afterEach(() => {
        this.remove()
      })
    }
  }
}

export default new DynamicModalClass()
export { DynamicModalClass }
