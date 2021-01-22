import mitt from 'mitt'
import { findComponentsDownward } from '../utils/assist'

function broadcast (componentName, eventName, params) {
  const components = findComponentsDownward(this, componentName)

  components.forEach((component) => component.mitt.emit.apply(component, [eventName].concat(params)))
}

export default {
  computed: {
    mitt () {
      return mitt()
    }
  },
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.mitt.emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
