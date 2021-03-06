<template>
  <tr
    v-if="draggable"
    :class="rowClasses(row._index)"
    :draggable="draggable"
    @dragstart="onDrag($event, row._index)"
    @drop="onDrop($event, row._index)"
    @dragover="allowDrop($event)"
  >
    <slot />
  </tr>
  <tr
    v-else
    :class="rowClasses(row._index)"
    :draggable="false"
  >
    <slot />
  </tr>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      required: true
    },
    prefixCls: {
      type: String,
      required: false,
      default: ''
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    },
    isChildren: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    objData () {
      return this.$parent.objData
    }
  },
  methods: {
    onDrag (e, index) {
      e.dataTransfer.setData('index', index)
    },
    onDrop (e, index) {
      const dragIndex = e.dataTransfer.getData('index')
      this.$parent.$parent.dragAndDrop(dragIndex, index)
      e.preventDefault()
    },
    allowDrop (e) {
      e.preventDefault()
    },
    rowClasses (_index) {
      const objData = this.isChildren ? this.$parent.$parent.getDataByRowKey(this.row._rowKey) : this.objData[_index]
      return [
                    `${this.prefixCls}-row`,
                    this.rowClsName(_index),
                    {
                      [`${this.prefixCls}-row-highlight`]: objData && objData._isHighlight,
                      [`${this.prefixCls}-row-hover`]: objData && objData._isHover
                    }
      ]
    },
    rowClsName (_index) {
      return this.$parent.$parent.rowClassName(this.objData[_index], _index)
    }
  }
}
</script>
