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
  data () {
    return {
      hasSider: false
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
  },
  mounted () {
    this.hasSider = this.findSider()
  },
  methods: {
    findSider () {
      return findComponentDownward(this, 'Sider')
    }
  }
}
</script>
