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
    if (this.$parent.$parent.$parent.$slots.default) {
      const slotKeys = this.slotOptions[0]?.children?.map && this.slotOptions[0]?.children?.map((e) => e.props) || []
      const newSlotKeys = this.$parent.$parent.$parent.$slots.default()[0].children[0]?.children?.map && this.$parent.$parent.$parent.$slots.default()[0].children[0]?.children.map((e) => e.props) || []

      if (JSON.stringify(slotKeys) !== JSON.stringify(newSlotKeys)) {
        this.slotUpdateHook()
      }
    }

    return h('ul', {}, [this.$slots.default(), this.options])
  }
}
</script>
