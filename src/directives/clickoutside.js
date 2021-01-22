export default {
  mounted (el, { value }, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }

      if (typeof value === 'function') {
        value(e)
      }
    }

    el.__vueClickOutside__ = documentHandler

    document.addEventListener('click', documentHandler)
  },
  update () {

  },
  unmount (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)

    delete el.__vueClickOutside__
  }
}
