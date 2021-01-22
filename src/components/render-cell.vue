<script>
import { h } from 'vue'

export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function
  },
  render () {
    return this.$props.render(h)
  }
}
</script>
