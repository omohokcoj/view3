import { createApp, h } from 'vue'

import mountWithContext from '../utils/mount-with-context'
import Popper from 'popper.js/dist/umd/popper.js'
import Popover from '../components/popover'
import DynamicPopover from '../plugins/dynamic-popover'

let currentPopover

function removeCurrentPopover () {
  if (currentPopover) {
    currentPopover.destroy()
    currentPopover.popper.remove()
  }
}

document.addEventListener('click', (e) => {
  if (currentPopover && !currentPopover.popper.contains(event.target)) {
    removeCurrentPopover()
  }
})

document.addEventListener('DOMContentLoaded', () => {
  if (DynamicPopover.app.config.globalProperties.$router) {
    DynamicPopover.app.config.globalProperties.$router.afterEach(() => {
      removeCurrentPopover()
    })
  }
})

export default {
  mounted (el, binding) {
    if (binding.value.disabled) return

    el.addEventListener(binding.value.trigger || 'click', () => {
      removeCurrentPopover()

      const instance = createApp({
        render () {
          return h(Popover, binding.value)
        }
      })

      const elem = mountWithContext(instance, DynamicPopover.app)

      if (binding.value.trigger === 'mouseenter') {
        elem.addEventListener('mouseleave', (event) => {
          if (!elem.contains(event.toElement)) {
            removeCurrentPopover()
          }
        })
      }

      document.body.appendChild(elem)

      currentPopover = new Popper(el, elem, { placement: binding.value.placement || 'top' })
      currentPopover.trigger = binding.value.trigger
    })

    if (binding.value.trigger === 'mouseenter') {
      el.addEventListener('mouseleave', (event) => {
        if (!currentPopover.popper.contains(event.toElement)) {
          removeCurrentPopover()
        }
      })
    }
  }
}
