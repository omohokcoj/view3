<template>
  <i
    :class="classes"
    :style="styles"
  />
</template>
<script>
const prefixCls = 'ion'

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      required: false,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    custom: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-${this.type}`]: this.type !== '',
                      [`${this.custom}`]: this.custom !== ''
                    }
      ]
    },
    styles () {
      const style = {}

      if (this.size) {
        style['font-size'] = `${this.size}px`
      }

      if (this.color) {
        style.color = this.color
      }

      return style
    }
  }
}
</script>
