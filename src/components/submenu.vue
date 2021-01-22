<template>
  <li
    :class="classes"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      ref="reference"
      :class="[prefixCls + '-submenu-title']"
      :style="titleStyle"
      @click.stop="handleClick"
    >
      <slot name="title" />
      <Icon
        :type="arrowType"
        :custom="customArrowType"
        :size="arrowSize"
        :class="[prefixCls + '-submenu-title-icon']"
      />
    </div>
    <CollapseTransition v-if="mode === 'vertical'">
      <ul
        v-show="opened"
        :class="[prefixCls]"
      >
        <slot />
      </ul>
    </CollapseTransition>
    <transition
      v-else
      name="slide-up"
    ><SelectDropdown
        v-show="opened"
        ref="drop"
        placement="bottom"
        :style="dropStyle"
      >
        <ul :class="[prefixCls + '-drop-list']">
          <slot />
        </ul>
      </SelectDropdown></transition>
  </li>
</template>
<script>
import SelectDropdown from './select-dropdown'
import Icon from './icon'
import CollapseTransition from './collapse-transition'
import { getStyle, findComponentUpward, findComponentsDownward } from '../utils/assist'
import Emitter from '../mixins/emitter'
import mixin from '../mixins/menu'

const prefixCls = 'ivu-menu'

export default {
  name: 'Submenu',
  components: { Icon, SelectDropdown, CollapseTransition },
  mixins: [Emitter, mixin],
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      active: false,
      opened: false,
      dropWidth: parseFloat(getStyle(this.$el, 'width'))
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}-submenu`,
                    {
                      [`${prefixCls}-item-active`]: this.active && !this.hasParentSubmenu,
                      [`${prefixCls}-opened`]: this.opened,
                      [`${prefixCls}-submenu-disabled`]: this.disabled,
                      [`${prefixCls}-submenu-has-parent-submenu`]: this.hasParentSubmenu,
                      [`${prefixCls}-child-item-active`]: this.active
                    }
      ]
    },
    accordion () {
      return this.menu.accordion
    },
    dropStyle () {
      const style = {}

      if (this.dropWidth) style.minWidth = `${this.dropWidth}px`
      return style
    },
    titleStyle () {
      return this.hasParentSubmenu && this.mode !== 'horizontal'
        ? {
            paddingLeft: 43 + (this.parentSubmenuNum - 1) * 24 + 'px'
          }
        : {}
    },
    // 3.4.0, global setting customArrow 有值时，arrow 赋值空
    arrowType () {
      return 'ios-arrow-down'
    },
    // 3.4.0, global setting
    customArrowType () {
      return ''
    },
    // 3.4.0, global setting
    arrowSize () {
      return ''
    }
  },
  watch: {
    mode (val) {
      if (val === 'horizontal') {
        this.$refs.drop.update()
      }
    },
    opened (val) {
      if (this.mode === 'vertical') return
      if (val) {
        // set drop a width to fixed when menu has fixed position
        this.dropWidth = parseFloat(getStyle(this.$el, 'width'))

        this.$refs.drop.update()
      } else {
        this.$refs.drop.destroy()
      }
    }
  },
  mounted () {
    this.mitt.on('on-menu-item-select', this.onMenuItemSelect)
    this.mitt.on('on-update-active-name', this.onUpdateActiveName)
  },
  methods: {
    onMenuItemSelect (name) {
      if (this.mode === 'horizontal') this.opened = false

      this.dispatch('Menu', 'on-menu-item-select', name)

      return true
    },
    onUpdateActiveName (status) {
      if (findComponentUpward(this, 'Submenu')) this.dispatch('Submenu', 'on-update-active-name', status)

      if (findComponentsDownward(this, 'Submenu')) {
        findComponentsDownward(this, 'Submenu').forEach(item => {
          item.active = false
        })
      }

      this.active = status
    },
    handleMouseenter () {
      if (this.disabled) return
      if (this.mode === 'vertical') return

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.menu.updateOpenKeys(this.name)
        this.opened = true
      }, 250)
    },
    handleMouseleave () {
      if (this.disabled) return
      if (this.mode === 'vertical') return

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.menu.updateOpenKeys(this.name)
        this.opened = false
      }, 150)
    },
    handleClick () {
      if (this.disabled) return
      if (this.mode === 'horizontal') return
      const opened = this.opened
      if (this.accordion) {
        this.$parent.$children.forEach(item => {
          if (item.$options.name === 'Submenu') item.opened = false
        })
      }
      this.opened = !opened
      this.menu.updateOpenKeys(this.name)
    }
  }
}
</script>
