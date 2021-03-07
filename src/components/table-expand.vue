<script>
import { h } from 'vue'

export default {
  name: 'TableExpand',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render ({ $props }) {
    const params = {
      row: $props.row,
      index: $props.index
    }

    if ($props.column) params.column = $props.column

    return $props.render(h, params)
  }
}
</script>
