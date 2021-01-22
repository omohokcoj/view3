<template>
  <li :class="classes">
    {{ data.label }}
    <Icon
      v-if="showArrow"
      :type="arrowType"
      :custom="customArrowType"
      :size="arrowSize"
    />
    <i
      v-if="showLoading"
      class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-cascader-menu-item-loading"
    />
  </li>
</template>
<script>
import Icon from './icon.vue'

export default {
  name: 'Casitem',
  components: { Icon },
  props: {
    data: Object,
    prefixCls: String,
    tmpItem: Object
  },
  computed: {
    classes () {
      return [
                    `${this.prefixCls}-menu-item`,
                    {
                      [`${this.prefixCls}-menu-item-active`]: this.tmpItem.value === this.data.value,
                      [`${this.prefixCls}-menu-item-disabled`]: this.data.disabled
                    }
      ]
    },
    showArrow () {
      return (this.data.children && this.data.children.length) || ('loading' in this.data && !this.data.loading)
    },
    showLoading () {
      return 'loading' in this.data && this.data.loading
    },
    // 3.4.0, global setting customArrow 有值时，arrow 赋值空
    arrowType () {
      return 'ios-arrow-forward'
    },
    // 3.4.0, global setting
    customArrowType () {
      return ''
    },
    // 3.4.0, global setting
    arrowSize () {
      return ''
    }
  }
}
</script>
