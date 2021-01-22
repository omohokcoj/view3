<template>
  <div :class="wrapClasses">
    <slot />
  </div>
</template>
<script>
const prefixCls = 'ivu-layout'
export default {
  name: 'Content',
  computed: {
    wrapClasses () {
      return `${prefixCls}-content`
    }
  }
}
</script>
