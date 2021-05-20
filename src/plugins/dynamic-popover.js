import { createApp, h } from 'vue'
import mountWithContext from '../utils/mount-with-context'

import Popper from 'popper.js/dist/umd/popper.js'
import Popover from '../components/popover'

function removeCurrentPopover () {
  if (DynamicPopover.currentPopover) {
    DynamicPopover.currentPopover.remove()
    DynamicPopover.currentPopover.popper.remove()
    DynamicPopover.currentPopover = null
  }
}

document.addEventListener('click', (e) => {
  if (DynamicPopover.currentPopover &&
    !DynamicPopover.currentPopover.popper.contains(event.target) &&
    !DynamicPopover.currentPopover.reference.contains(event.target)) {
    removeCurrentPopover()
  }
})

const DynamicPopover = {
  currentPopover: null,
  show (el, component, props, opts = {}) {
    removeCurrentPopover()

    const instance = createApp({
      render () {
        return h(Popover, {
          bodyStyle: 'padding: 0'
        }, () => [
          h(component, props)
        ])
      }
    })

    const node = mountWithContext(instance, this.app)

    this.currentPopover = new Popper(el, node, {
      placement: opts.placement || 'bottom',
      modifiers: {
        computeStyle:{
          gpuAcceleration: false,
        },
        preventOverflow :{
          boundariesElement: 'window'
        }
      }
    })

    this.currentPopover.remove = () => {
      if (opts.onRemove) {
        opts.onRemove()
      }

      this.currentPopover.destroy()
    }
  },
  remove () {
    removeCurrentPopover()
  },
  install (app, _) {
    this.app = app


    app.config.globalProperties.$Popover = this

    if (app.config.globalProperties.$router) {
      app.config.globalProperties.$router.afterEach(() => {
        this.remove()
      })
    }
  }
}

export default DynamicPopover
