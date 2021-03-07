<script>
import { h } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  render () {
    return h('ul', {}, this.$slots.default())
  }
}
</script>
