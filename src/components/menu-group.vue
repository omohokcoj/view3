<template>
  <li :class="[prefixCls + '-item-group']">
    <div
      :class="[prefixCls + '-item-group-title']"
      :style="groupStyle"
    >
      {{ title }}
    </div>
    <ul><slot /></ul>
  </li>
</template>
<script>
import mixin from '../mixins/menu'
const prefixCls = 'ivu-menu'

export default {
  name: 'MenuGroup',
  mixins: [mixin],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    groupStyle () {
      return {}
    }
  }
}
</script>
