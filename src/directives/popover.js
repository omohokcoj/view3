import { createApp, h } from 'vue'

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
  mounted (el, binding) {
    if (binding.value.disabled) return

    el.addEventListener(binding.value.trigger || 'click', () => {
      removeCurrentPopover()

      const instance = createApp({
        render () {
          return h(Popover, binding.value)
        }
      })

      const node = document.createElement('div')
      const elem = instance.mount(node).$el

      document.body.appendChild(elem)

      currentPopover = new Popper(el, elem, { placement: 'top' })
    })
  }
}
