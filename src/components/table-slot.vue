<script>
import { h } from 'vue'

export default {
  name: 'TableSlot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: Object,
    index: Number,
    column: {
      type: Object,
      default: null
    },
    display: {
      type: String,
      default: 'block'
    }
  },
  render: ({ $props }) => {
    return h('div', {
      class: {
        'ivu-table-cell-slot': true,
        'ivu-table-cell-slot-inline': $props.display === 'inline',
        'ivu-table-cell-slot-inline-block': $props.display === 'inline-block'
      }
    }, $props.tableRoot.$scopedSlots[$props.column.slot]({
      row: $props.row,
      column: $props.column,
      index: $props.index
    }))
  }
}
</script>
