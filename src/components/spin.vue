<template>
  <transition name="fade">
    <div
      v-if="fullscreenVisible"
      :class="classes"
    >
      <div :class="mainClasses">
        <span :class="dotClasses" />
        <div :class="textClasses">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { oneOf } from '../utils/assist'
import ScrollbarMixins from '../mixins/scrollbar'

const prefixCls = 'ivu-spin'

export default {
  name: 'Spin',
  mixins: [ScrollbarMixins],
  props: {
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default () {
        return 'default'
      }
    },
    fix: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showText: false,
      visible: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-fix`]: this.fix,
          [`${prefixCls}-show-text`]: this.showText,
          [`${prefixCls}-fullscreen`]: this.fullscreen
        }
      ]
    },
    mainClasses () {
      return `${prefixCls}-main`
    },
    dotClasses () {
      return `${prefixCls}-dot`
    },
    textClasses () {
      return `${prefixCls}-text`
    },
    fullscreenVisible () {
      if (this.fullscreen) {
        return this.visible
      } else {
        return true
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.addScrollEffect()
      } else {
        this.removeScrollEffect()
      }
    }
  },
  mounted () {
    this.showText = this.$slots.default !== undefined
  }
}
</script>
