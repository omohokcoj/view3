<template>
  <div
    v-transfer-dom
    :data-transfer="transfer"
  >
    <transition name="fade">
      <div
        v-show="visible"
        v-if="mask"
        :class="maskClasses"
        :style="maskStyle"
        @click="handleMask"
      />
    </transition>
    <div
      :class="wrapClasses"
      @click="handleWrapClick"
    >
      <transition :name="'move-' + placement">
        <div
          v-show="visible"
          :class="classes"
          :style="mainStyles"
        >
          <div
            ref="content"
            :class="contentClasses"
          >
            <a
              v-if="closable"
              class="ivu-drawer-close"
              @click="close"
            >
              <slot name="close">
                <Icon type="ios-close" />
              </slot>
            </a>
            <div
              v-if="showHead"
              :class="[prefixCls + '-header']"
            >
              <slot name="header">
                <div :class="[prefixCls + '-header-inner']">
                  {{ dataTitle || title }}
                </div>
              </slot>
            </div>
            <div
              :class="[prefixCls + '-body']"
              :style="styles"
            >
              <slot />
            </div>
          </div>
          <div
            v-if="draggable"
            class="ivu-drawer-drag"
            :class="{ 'ivu-drawer-drag-left': placement === 'left' }"
            @mousedown="handleTriggerMousedown"
          >
            <slot name="trigger">
              <div class="ivu-drawer-drag-move-trigger">
                <div class="ivu-drawer-drag-move-trigger-point">
                  <i /><i /><i /><i /><i />
                </div>
              </div>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Icon from './icon'
import { oneOf, findBrothersComponents, findComponentsUpward } from '../utils/assist'
import TransferDom from '../directives/transfer-dom'
import Emitter from '../mixins/emitter'
import ScrollbarMixins from '../mixins/scrollbar'

import { on, off } from '../utils/dom'

const prefixCls = 'ivu-drawer'

export default {
  name: 'Drawer',
  components: { Icon },
  directives: { TransferDom },
  mixins: [Emitter, ScrollbarMixins],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskStyle: {
      type: Object
    },
    styles: {
      type: Object
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    handleClickOutside: {
      type: Function,
      default () {
        this.close()
      }
    },
    placement: {
      validator (value) {
        return oneOf(value, ['left', 'right'])
      },
      default: 'right'
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    transfer: {
      type: Boolean,
      default () {
        return true
      }
    },
    className: {
      type: String
    },
    inner: {
      type: Boolean,
      default: false
    },
    // Whether drag and drop is allowed to adjust width
    draggable: {
      type: Boolean,
      default: false
    },
    beforeClose: Function
  },
  emits: ['visible-change', 'close', 'update:modelValue'],
  data () {
    return {
      prefixCls: prefixCls,
      visible: this.modelValue,
      wrapShow: false,
      showHead: true,
      canMove: false,
      dragWidth: this.width,
      wrapperWidth: this.width,
      wrapperLeft: 0,
      minWidth: 256,
      dataTitle: ''
    }
  },
  computed: {
    wrapClasses () {
      return [
                    `${prefixCls}-wrap`,
                    {
                      [`${prefixCls}-hidden`]: !this.wrapShow,
                      [`${this.className}`]: !!this.className,
                      [`${prefixCls}-no-mask`]: !this.mask,
                      [`${prefixCls}-wrap-inner`]: this.inner,
                      [`${prefixCls}-wrap-dragging`]: this.canMove
                    }
      ]
    },
    mainStyles () {
      const style = {}

      const width = parseInt(this.dragWidth)

      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`
      }

      Object.assign(style, styleWidth)

      return style
    },
    contentClasses () {
      return [
                    `${prefixCls}-content`,
                    {
                      [`${prefixCls}-content-no-mask`]: !this.mask
                    }
      ]
    },
    classes () {
      return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.placement}`,
                    {
                      [`${prefixCls}-no-header`]: !this.showHead,
                      [`${prefixCls}-inner`]: this.inner
                    }
      ]
    },
    maskClasses () {
      return [
                    `${prefixCls}-mask`,
                    {
                      [`${prefixCls}-mask-inner`]: this.inner
                    }
      ]
    }
  },
  watch: {
    modelValue (val) {
      this.visible = val
    },
    visible (val) {
      if (val === false) {
        this.timer = setTimeout(() => {
          this.wrapShow = false
          // #4831 Check if there are any drawers left at the parent level
          const brotherDrawers = findBrothersComponents(this, 'Drawer') || []
          const parentDrawers = findComponentsUpward(this, 'Drawer') || []

          const otherDrawers = [].concat(brotherDrawers).concat(parentDrawers)

          const isScrollDrawer = otherDrawers.some(item => item.visible && !item.scrollable)

          if (!isScrollDrawer) {
            this.removeScrollEffect()
          }
        }, 300)
      } else {
        if (this.timer) clearTimeout(this.timer)
        this.wrapShow = true
        if (!this.scrollable) {
          this.addScrollEffect()
        }
      }
      this.broadcast('Table', 'on-visible-change', val)
      this.broadcast('Slider', 'on-visible-change', val) // #2852
      this.$emit('visible-change', val)
    },
    scrollable (val) {
      if (!val) {
        this.addScrollEffect()
      } else {
        this.removeScrollEffect()
      }
    },
    title (val) {
      if (this.$slots.header === undefined) {
        this.showHead = !!val
      }
    },
    width (val) {
      this.dragWidth = val
    }
  },
  mounted () {
    if (this.visible) {
      this.wrapShow = true
    }

    let showHead = true

    if (this.$slots.header === undefined && !this.title) {
      showHead = false
    }

    this.showHead = showHead

    on(document, 'mousemove', this.handleMousemove)
    on(document, 'mouseup', this.handleMouseup)
    this.handleSetWrapperWidth()

    document.addEventListener('keydown', this.EscClose)
  },
  beforeUnmount () {
    off(document, 'mousemove', this.handleMousemove)
    off(document, 'mouseup', this.handleMouseup)
    document.removeEventListener('keydown', this.EscClose)
    this.removeScrollEffect()
  },
  methods: {
    setTitle (value) {
      this.dataTitle = value
      this.showHead = !!value
    },
    EscClose (e) {
      if (this.visible) {
        if (e.keyCode === 27) {
          this.handleClickOutside()
        }
      }
    },
    close () {
      if (!this.beforeClose) {
        return this.handleClose()
      }

      const before = this.beforeClose()

      if (before && before.then) {
        before.then(() => {
          this.handleClose()
        })
      } else {
        this.handleClose()
      }
    },
    handleClose () {
      this.visible = false
      this.$emit('update:modelValue', false)
      this.$emit('close')
    },
    handleMask () {
      if (this.maskClosable && this.mask && !window.getSelection().toString()) {
        this.handleClickOutside()
      }
    },
    handleWrapClick (event) {
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
      const className = event.target.getAttribute('class')
      if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask()
    },
    handleMousemove (event) {
      if (!this.canMove || !this.draggable) return
      // 更新容器宽度和距离左侧页面距离，如果是window则距左侧距离为0
      this.handleSetWrapperWidth()
      const left = event.pageX - this.wrapperLeft
      // 如果抽屉方向为右边，宽度计算需用容器宽度减去left
      let width = this.placement === 'right' ? this.wrapperWidth - left : left
      // 限定最小宽度
      width = Math.max(width, parseFloat(this.minWidth))
      event.atMin = width === parseFloat(this.minWidth)
      // 如果当前width不大于100，视为百分比
      if (width <= 100) width = (width / this.wrapperWidth) * 100
      this.dragWidth = width
      this.$emit('on-resize-width', parseInt(this.dragWidth))
    },
    handleSetWrapperWidth () {
      const {
        width,
        left
      } = this.$el.getBoundingClientRect()
      this.wrapperWidth = width
      this.wrapperLeft = left
    },
    handleMouseup () {
      if (!this.draggable) return
      this.canMove = false
    },
    handleTriggerMousedown () {
      this.canMove = true
      // 防止鼠标选中抽屉中文字，造成拖动trigger触发浏览器原生拖动行为
      window.getSelection().removeAllRanges()
    }
  }
}
</script>
