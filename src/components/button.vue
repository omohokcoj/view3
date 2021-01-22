<template>
  <component
    :is="tagName"
    :class="classes"
    v-bind="tagProps"
    @click="handleClickLink"
  >
    <Icon
      v-if="loading"
      class="ivu-load-loop"
      type="ios-loading"
    />
    <Icon
      v-if="(icon || customIcon) && !loading"
      :type="icon"
      :custom="customIcon"
    />
    {{ ' ' }}
    <span
      v-if="showSlot"
      ref="slot"
    ><slot /></span>
  </component>
</template>

<script>
import Icon from './icon'
import { oneOf } from '../utils/assist'
import mixinsLink from '../mixins/link'
import mixinsForm from '../mixins/form'

const prefixCls = 'ivu-btn'

export default {
  name: 'VButton',
  components: { Icon },
  mixins: [mixinsLink, mixinsForm],
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'])
      },
      default: 'default'
    },
    shape: {
      validator (value) {
        return oneOf(value, ['circle', 'circle-outline'])
      },
      required: false,
      default: null
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      required: false,
      default () {
        return 'default'
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    htmlType: {
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset'])
      }
    },
    icon: {
      type: String,
      default: ''
    },
    customIcon: {
      type: String,
      default: ''
    },
    long: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  emits: ['click'],
  computed: {
    showSlot () {
      return !!this.$slots.default
    },
    classes () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
          [`${prefixCls}-ghost`]: this.ghost
        }
      ]
    },
    isHrefPattern () {
      return !!this.to
    },
    tagName () {
      const { isHrefPattern } = this
      return isHrefPattern ? 'a' : 'button'
    },
    tagProps () {
      const { isHrefPattern } = this
      let props = {}

      if (isHrefPattern) {
        const { linkUrl, target } = this
        props = { href: linkUrl, target }
      } else {
        const { htmlType } = this
        props = { type: htmlType }
      }

      if (this.itemDisabled) {
        props.disabled = true
      }

      return props
    }
  },
  methods: {
    handleClickLink (event) {
      this.$emit('click', event)
      const openInNewWindow = event.ctrlKey || event.metaKey

      this.handleCheckClick(event, openInNewWindow)
    }
  }
}
</script>
