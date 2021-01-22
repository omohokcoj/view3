<template>
  <div :class="wrapClasses">
    <slot />
  </div>
</template>
<script>
const prefixCls = 'ivu-layout'
export default {
  name: 'Footer',
  computed: {
    wrapClasses () {
      return `${prefixCls}-footer`
    }
  }
}
</script>
