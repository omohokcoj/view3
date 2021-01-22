<template>
  <li
    class="ivu-list-item"
    :class="classes"
  >
    <template v-if="itemLayout === 'vertical' && $slots.extra">
      <div class="ivu-list-item-main">
        <slot />
        <ul
          v-if="$slots.action"
          class="ivu-list-item-action"
        >
          <slot name="action" />
        </ul>
      </div>
      <div class="ivu-list-item-extra">
        <slot name="extra" />
      </div>
    </template>
    <template v-else>
      <slot />
      <ul
        v-if="$slots.action"
        class="ivu-list-item-action"
      >
        <slot name="action" />
      </ul>
      <div class="ivu-list-item-extra">
        <slot name="extra" />
      </div>
    </template>
  </li>
</template>
<script>
export default {
  name: 'ListItem',
  inject: ['ListInstance'],
  props: {

  },
  computed: {
    itemLayout () {
      return this.ListInstance.itemLayout
    },
    isItemContainsTextNode () {
      let result
      this.$slots.default().forEach(item => {
        if (typeof item === 'string') {
          result = true
        }
      })
      return result
    },
    isFlexMode () {
      const extra = this.$slots.extra

      if (this.itemLayout === 'vertical') {
        return !!extra
      }

      return !this.isItemContainsTextNode
    },
    classes () {
      return [
        {
          'ivu-list-item-no-flex': !this.isFlexMode
        }
      ]
    }
  }
}
</script>
