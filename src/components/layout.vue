<template>
  <div :class="wrapClasses">
    <slot />
  </div>
</template>
<script>
import { findComponentDownward } from '../utils/assist'

const prefixCls = 'ivu-layout'

export default {
  name: 'Layout',
  props: {
    hasSider: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    wrapClasses () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-has-sider`]: this.hasSider
                    }
      ]
    }
  }
}
</script>
