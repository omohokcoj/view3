import { createApp, h } from 'vue'
import mountWithContext from '../utils/mount-with-context'

import Popper from 'popper.js/dist/umd/popper.js'
import Popover from '../components/popover'

let currentPopover

function removeCurrentPopover () {
  if (currentPopover) {
    currentPopover.destroy()
    currentPopover.popper.remove()
  }
}

document.addEventListener('click', (e) => {
  if (currentPopover) {
    removeCurrentPopover()
  }
})

export default {
  show (el, component, options, context) {
    removeCurrentPopover()

    const instance = createApp({
      ...context,
      render () {
        return h(Popover, {
          bodyStyle: 'padding: 0'
        }, () => [
          h(component, options)
        ])
      }
    })

    const node = mountWithContext(instance, this.app)

    currentPopover = new Popper(el, node, { placement: 'top' })
  },
  remove () {
    removeCurrentPopover()
  },
  install (app, _) {
    this.app = app

    app.config.globalProperties.$Popover = this
  }
}
