<script>
import { h } from 'vue'

export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function
  },
  render ({ $props }) {
    return $props.render(h)
  }
}
</script>
