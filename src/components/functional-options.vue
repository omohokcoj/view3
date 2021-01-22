<script>
import { h } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    slotOptions: {
      type: Array,
      default: () => []
    },
    slotUpdateHook: {
      type: Function,
      default: () => {}
    }
  },
  // if use functional, there will be memory leaks
  // functional: true,
  render () {
    // if (this.slotOptions !== this.$parent.$slots.default()) {
    //   console.log(this.slotUpdateHook)
    //   this.slotUpdateHook()
    // }

    return h('ul', [
      this.$slots.default(),
      this.options
    ])
  }
}
</script>
