<template>
  <div
    v-click-outside="onClickoutside"
    :class="[prefixCls]"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      ref="reference"
      :class="relClasses"
      @click="handleClick"
      @contextmenu.prevent="handleRightClick"
    >
      <slot />
    </div>
    <transition name="transition-drop">
      <Drop
        v-show="currentVisible"
        ref="drop"
        v-transfer-dom
        :class="dropdownCls"
        :placement="placement"
        :data-transfer="transfer"
        :transfer="transfer"
        @mouseenter.native="handleMouseenter"
        @mouseleave.native="handleMouseleave"
      >
        <slot name="list" />
      </Drop>
    </transition>
  </div>
</template>
<script>
import Drop from './select-dropdown'
import clickOutside from '../directives/clickoutside'
import TransferDom from '../directives/transfer-dom'
import { oneOf, findComponentUpward } from '../utils/assist'
import Emitter from '../mixins/emitter'

const prefixCls = 'ivu-dropdown'

export default {
  name: 'Dropdown',
  directives: { clickOutside, TransferDom },
  components: { Drop },
  mixins: [Emitter],
  props: {
    trigger: {
      validator (value) {
        return oneOf(value, ['click', 'hover', 'custom', 'contextMenu'])
      },
      default: 'hover'
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'])
      },
      default: 'bottom'
    },
    visible: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default () {
        return false
      }
    },
    transferClassName: {
      type: String
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    // 4.0.0
    capture: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  emits: ['on-clickoutside', 'on-visible-change'],
  data () {
    return {
      prefixCls: prefixCls,
      currentVisible: this.visible
    }
  },
  computed: {
    transition () {
      return ['bottom-start', 'bottom', 'bottom-end'].indexOf(this.placement) > -1 ? 'slide-up' : 'fade'
    },
    dropdownCls () {
      return {
        [prefixCls + '-transfer']: this.transfer,
        [this.transferClassName]: this.transferClassName
      }
    },
    relClasses () {
      return [
                    `${prefixCls}-rel`,
                    {
                      [`${prefixCls}-rel-user-select-none`]: this.trigger === 'contextMenu'
                    }
      ]
    }
  },
  watch: {
    visible (val) {
      this.currentVisible = val
    },
    currentVisible (val) {
      if (val) {
        this.$refs.drop.update()
      } else {
        this.$refs.drop.destroy()
      }
      this.$emit('on-visible-change', val)
    }
  },
  mounted () {
    this.mitt.on('on-click', (key) => {
      if (this.stopPropagation) return
      const $parent = this.hasParent()
      if ($parent) $parent.$emit('on-click', key)
    })

    this.mitt.on('on-hover-click', () => {
      const $parent = this.hasParent()
      if ($parent) {
        this.$nextTick(() => {
          if (this.trigger === 'custom') return false
          this.currentVisible = false
        })
        $parent.$emit('on-hover-click')
      } else {
        this.$nextTick(() => {
          if (this.trigger === 'custom') return false
          this.currentVisible = false
        })
      }
    })

    this.mitt.on('on-haschild-click', () => {
      this.$nextTick(() => {
        if (this.trigger === 'custom') return false
        this.currentVisible = true
      })
      const $parent = this.hasParent()
      if ($parent) $parent.$emit('on-haschild-click')
    })
  },
  methods: {
    handleClick () {
      if (this.trigger === 'custom') return false
      if (this.trigger !== 'click') {
        return false
      }
      // #661
      const $parent = this.hasParent()
      if (!$parent) this.currentVisible = !this.currentVisible
    },
    handleRightClick () {
      if (this.trigger === 'custom') return false
      if (this.trigger !== 'contextMenu') {
        return false
      }
      this.currentVisible = !this.currentVisible
    },
    handleMouseenter () {
      if (this.trigger === 'custom') return false
      if (this.trigger !== 'hover') {
        return false
      }
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.currentVisible = true
      }, 250)
    },
    handleMouseleave () {
      if (this.trigger === 'custom') return false
      if (this.trigger !== 'hover') {
        return false
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.currentVisible = false
        }, 150)
      }
    },
    onClickoutside (e) {
      this.handleClose()
      this.handleRightClose()
      if (this.currentVisible) this.$emit('on-clickoutside', e)
    },
    handleClose () {
      if (this.trigger === 'custom') return false
      if (this.trigger !== 'click') {
        return false
      }
      this.currentVisible = false
    },
    handleRightClose () {
      if (this.trigger === 'custom') return false
      if (this.trigger !== 'contextMenu') {
        return false
      }
      this.currentVisible = false
    },
    hasParent () {
      //                const $parent = this.$parent.$parent.$parent;
      const $parent = findComponentUpward(this, 'Dropdown')
      if ($parent) {
        return $parent
      } else {
        return false
      }
    }
  }
}
</script>
