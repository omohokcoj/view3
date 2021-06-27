import { createApp, h } from 'vue'
import mountWithContext from '../utils/mount-with-context'

function createInstance (app, component, props, render, onRemove) {
  let node

  const slots = props.slots || {}
  delete props.slots

  const instance = createApp({
    methods: {
      remove () {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy () {
        document.body.removeChild(this.$el)
        onRemove()
      }
    },
    render () {
      node = h(component, {
        ...props,
        onVisibleChange: (visible) => {
          if (!visible) this.remove()
        }
      }, {
        ...slots,
        default: () => render(h)
      })

      return node
    }
  })

  mountWithContext(instance, app)

  return {
    component: node.component.proxy,
    show () {
      node.component.proxy.visible = true
    },

    remove () {
      node.component.proxy.visible = false
    }
  }
}
export default createInstance
