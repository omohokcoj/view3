import { createApp, h } from 'vue'

import Notification from '../components/notification'

function createInstance (properties) {
  let node
  let component
  const _props = properties || {}

  const instance = createApp({
    render () {
      node = h(Notification, _props)

      return node
    }
  })

  const elem = document.createElement('div')
  const parentElem = document.createElement('div')

  document.body.appendChild(parentElem)
  parentElem.appendChild(instance.mount(elem).$el)

  component = node.component.proxy

  return {
    notice (noticeProps) {
      component.add(noticeProps)
    },
    remove (name) {
      component.close(name)
    },
    component: component,
    destroy (element) {
      component.closeAll()

      setTimeout(() => {
        document.body.removeChild(document.getElementsByClassName(element)[0])
      }, 500)
    }
  }
};

export default createInstance
