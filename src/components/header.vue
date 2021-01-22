<template>
  <div :class="wrapClasses">
    <slot />
  </div>
</template>
<script>
const prefixCls = 'ivu-layout'
export default {
  name: 'Header',
  computed: {
    wrapClasses () {
      return `${prefixCls}-header`
    }
  }
}
</script>
