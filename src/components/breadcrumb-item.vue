<template>
  <span>
    <a
      v-if="to"
      :href="linkUrl"
      :target="target"
      :class="linkClasses"
      @click.exact="handleCheckClick($event, false)"
      @click.ctrl="handleCheckClick($event, true)"
      @click.meta="handleCheckClick($event, true)"
    >
      <slot />
    </a>
    <span
      v-else
      :class="linkClasses"
    >
      <slot />
    </span>
    <span
      v-if="!showSeparator"
      :class="separatorClasses"
      v-html="separator"
    />
    <span
      v-else
      :class="separatorClasses"
    >
      <slot name="separator" />
    </span>
  </span>
</template>
<script>
import mixinsLink from '../mixins/link'
const prefixCls = 'ivu-breadcrumb-item'

export default {
  name: 'BreadcrumbItem',
  mixins: [mixinsLink],
  props: {

  },
  data () {
    return {
      separator: '',
      showSeparator: false
    }
  },
  computed: {
    linkClasses () {
      return `${prefixCls}-link`
    },
    separatorClasses () {
      return `${prefixCls}-separator`
    }
  },
  mounted () {
    this.showSeparator = this.$slots.separator !== undefined
  }
}
</script>
