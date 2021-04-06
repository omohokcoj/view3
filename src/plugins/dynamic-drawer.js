import createInstance from './create-modal'
import DrawerComponent from '../components/drawer'

const defaultOptions = {
  width: 720,
  closable: false
}

export default {
  open (component, props, opts) {
    const options = { ...defaultOptions, ...opts }
    const instance = this.getDrawerInstance(component, props, options)

    instance.show(options)
  },

  remove () {
    if (this.drawerInstance) {
      const instance = this.getDrawerInstance()

      instance.remove()
    }
  },

  getDrawerInstance (component, props, options) {
    this.drawerInstance = this.drawerInstance || createInstance(
      this.app,
      DrawerComponent,
      options,
      (h) => h(component, { ...props }),
      () => {
        if (options.onClose) options.onClose()
        this.drawerInstance = null
      }
    )

    return this.drawerInstance
  },

  install (app, _) {
    this.app = app

    app.config.globalProperties.$Drawer = this
  }
}
