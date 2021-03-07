<template>
  <div
    :class="[prefixCls]"
  >
    <transition name="fade">
      <div
        ref="popper"
        :class="dropdownCls"
        :style="dropStyles"
      >
        <div :class="[prefixCls + '-content']">
          <div :class="[prefixCls + '-arrow']" />
          <div
            :class="innerClasses"
            :style="innerStyles"
          >
            <slot name="content">
              {{ content }}
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const prefixCls = 'ivu-tooltip'

export default {
  name: 'DynamicTooltip',
  props: {
    content: {
      type: [String, Number],
      default: ''
    },
    theme: {
      validator (value) {
        return ['dark', 'light'].includes(value)
      },
      default: 'dark'
    },
    maxWidth: {
      type: [String, Number]
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    innerStyles () {
      const styles = {}

      if (this.maxWidth) styles['max-width'] = `${this.maxWidth}px`

      return styles
    },
    innerClasses () {
      return [
                    `${prefixCls}-inner`,
                    {
                      [`${prefixCls}-inner-with-width`]: !!this.maxWidth
                    }
      ]
    },
    dropStyles () {
      const styles = {}

      styles['z-index'] = 1060

      return styles
    },
    dropdownCls () {
      return [
                    `${prefixCls}-popper`,
                    `${prefixCls}-${this.theme}`
      ]
    }
  }
}
</script>
