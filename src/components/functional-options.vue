<script>
import { h } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      default: []
    },
    slotOptions: {
      type: Array,
      default: []
    },
    slotUpdateHook: {
      type: Function,
      default: () => {}
    }
  },
  render () {
    return h('ul', {}, [this.$slots.default(), this.options])
  }
}
</script>
