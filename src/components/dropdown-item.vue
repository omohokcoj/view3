<template>
  <li
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </li>
</template>
<script>
import { findComponentUpward } from '../utils/assist'
const prefixCls = 'ivu-dropdown-item'
export default {
  name: 'DropdownItem',
  props: {
    name: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-disabled`]: this.disabled,
                      [`${prefixCls}-selected`]: this.selected,
                      [`${prefixCls}-divided`]: this.divided
                    }
      ]
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return
      const $parent = findComponentUpward(this, 'Dropdown')
      const hasChildren = this.$parent && this.$parent.$options.name === 'Dropdown'

      if (hasChildren) {
        this.$parent.mitt.emit('on-haschild-click')
      } else {
        if ($parent && $parent.$options.name === 'Dropdown') {
          $parent.mitt.emit('on-hover-click')
        }
      }
      $parent.mitt.emit('on-click', this.name)
    }
  }
}
</script>
