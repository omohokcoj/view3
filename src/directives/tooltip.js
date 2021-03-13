import { createApp, h } from 'vue'

import Popper from 'popper.js/dist/umd/popper.js'
import Tooltip from '../components/dynamic-tooltip'

let currentTooltip

function removeCurrentTooltip () {
  if (currentTooltip) {
    currentTooltip.destroy()
    currentTooltip.popper.remove()
  }
}

document.addEventListener('click', (e) => {
  if (currentTooltip) {
    removeCurrentTooltip()
  }
})

export default {
  mounted (el, binding) {
    if (binding.value.disabled) return

    el.addEventListener(binding.value.trigger || 'mouseenter', () => {
      removeCurrentTooltip()

      const instance = createApp({
        render () {
          return h(Tooltip, binding.value)
        }
      })

      const node = document.createElement('div')
      const elem = instance.mount(node).$el

      document.body.appendChild(elem)

      currentTooltip = new Popper(el, elem, {
        placement: binding.value.placement || 'top'
      })
    })

    el.addEventListener('mouseleave', (event) => {
      if (!currentTooltip.popper.contains(event.toElement)) {
        removeCurrentTooltip()
      }
    })
  }
}
