<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { findComponentsDownward } from '../utils/assist'

const prefixCls = 'ivu-breadcrumb'

export default {
  name: 'Breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  computed: {
    classes () {
      return `${prefixCls}`
    }
  },
  watch: {
    separator () {
      this.updateChildren()
    }
  },
  mounted () {
    this.updateChildren()
  },
  updated () {
    this.$nextTick(() => {
      this.updateChildren()
    })
  },
  methods: {
    updateChildren () {
      findComponentsDownward(this, 'BreadcrumbItem').forEach((child) => {
        child.separator = this.separator
      })
    }
  }
}
</script>
