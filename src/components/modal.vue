<template>
  <div
    v-transfer-dom
    :data-transfer="transfer"
  >
    <transition :name="transitionNames[1]">
      <div
        v-show="visible"
        v-if="showMask"
        :class="maskClasses"
        :style="wrapStyles"
        @click="handleMask"
      />
    </transition>
    <div
      :class="wrapClasses"
      :style="wrapStyles"
      @click="handleWrapClick"
    >
      <transition
        :name="transitionNames[0]"
        @after-leave="animationFinish"
      >
        <div
          v-show="visible"
          :class="classes"
          :style="mainStyles"
          @mousedown="handleMousedown"
        >
          <div
            ref="content"
            :class="contentClasses"
            :style="contentStyles"
            @click="handleClickModal"
          >
            <div class="ivu-modal-header-content">
              <a
                v-if="closable"
                :class="[prefixCls + '-close']"
                @click="close"
              >
                <slot name="close">
                  <Icon type="ios-close" />
                </slot>
              </a>
              <div
                v-if="showHead"
                :class="[prefixCls + '-header']"
                @mousedown="handleMoveStart"
              >
                <slot name="header">
                  <div :class="[prefixCls + '-header-inner']">
                    {{ title }}
                  </div>
                </slot>
              </div>
            </div>
            <div :class="[prefixCls + '-body']">
              <slot />
            </div>
            <div
              v-if="!footerHide"
              :class="[prefixCls + '-footer']"
            >
              <slot name="footer">
                <VButton
                  type="text"
                  @click.native="cancel"
                >
                  {{ localeCancelText }}
                </VButton>
                <VButton
                  type="primary"
                  :loading="buttonLoading"
                  @click.native="ok"
                >
                  {{ localeOkText }}
                </VButton>
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Icon from './icon'
import VButton from './button'
import TransferDom from '../directives/transfer-dom'
import Locale from '../mixins/locale'
import Emitter from '../mixins/emitter'
import ScrollbarMixins from '../mixins/scrollbar'

import { on, off } from '../utils/dom'
import { findComponentsDownward } from '../utils/assist'

import { transferIndex as modalIndex, transferIncrease as modalIncrease, lastVisibleIndex, lastVisibleIncrease } from '../utils/transfer-queue'

const prefixCls = 'ivu-modal'

export default {
  name: 'Modal',
  components: { Icon, VButton },
  directives: { TransferDom },
  mixins: [Locale, Emitter, ScrollbarMixins],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default () {
        return true
      }
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 520
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    },
    className: {
      type: String
    },
    // for instance
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    transitionNames: {
      type: Array,
      default () {
        return ['ease', 'fade']
      }
    },
    transfer: {
      type: Boolean,
      default () {
        return true
      }
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  emits: ['visible-change', 'update:modelValue', 'on-cancel', 'on-hidden'],
  data () {
    return {
      prefixCls: prefixCls,
      wrapShow: false,
      showHead: true,
      buttonLoading: false,
      visible: this.modelValue,
      dragData: {
        x: null,
        y: null,
        dragX: null,
        dragY: null,
        dragging: false
      },
      modalIndex: this.handleGetModalIndex(), // for Esc close the top modal
      isMouseTriggerIn: false // #5800
    }
  },
  computed: {
    wrapClasses () {
      return [
                    `${prefixCls}-wrap`,
                    {
                      [`${prefixCls}-hidden`]: !this.wrapShow,
                      [`${this.className}`]: !!this.className,
                      [`${prefixCls}-no-mask`]: !this.showMask
                    }
      ]
    },
    wrapStyles () {
      return {
        zIndex: this.modalIndex + this.zIndex
      }
    },
    maskClasses () {
      return `${prefixCls}-mask`
    },
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-fullscreen`]: this.fullscreen,
                      [`${prefixCls}-fullscreen-no-header`]: this.fullscreen && !this.showHead,
                      [`${prefixCls}-fullscreen-no-footer`]: this.fullscreen && this.footerHide
                    }
      ]
    },
    contentClasses () {
      return [
                    `${prefixCls}-content`,
                    {
                      [`${prefixCls}-content-no-mask`]: !this.showMask,
                      [`${prefixCls}-content-drag`]: this.draggable,
                      [`${prefixCls}-content-dragging`]: this.draggable && this.dragData.dragging
                    }
      ]
    },
    mainStyles () {
      const style = {}

      const width = parseInt(this.width)
      const styleWidth = this.dragData.x !== null
        ? {
            top: 0
          }
        : {
            width: width <= 100 ? `${width}%` : `${width}px`
          }

      const customStyle = this.styles ? this.styles : {}

      Object.assign(style, styleWidth, customStyle)

      return style
    },
    contentStyles () {
      const style = {}

      if (this.draggable) {
        const customTop = this.styles.top ? parseFloat(this.styles.top) : 0
        const customLeft = this.styles.left ? parseFloat(this.styles.left) : 0
        if (this.dragData.x !== null) style.left = `${this.dragData.x - customLeft}px`
        if (this.dragData.y !== null) style.top = `${this.dragData.y}px`
        if (this.dragData.y !== null) style.top = `${this.dragData.y - customTop}px`

        const width = parseInt(this.width)
        const styleWidth = {
          width: width <= 100 ? `${width}%` : `${width}px`
        }

        Object.assign(style, styleWidth)
      }

      return style
    },
    localeOkText () {
      if (this.okText === undefined) {
        return this.t('i.modal.okText')
      } else {
        return this.okText
      }
    },
    localeCancelText () {
      if (this.cancelText === undefined) {
        return this.t('i.modal.cancelText')
      } else {
        return this.cancelText
      }
    },
    showMask () {
      return this.draggable ? false : this.mask
    }
  },
  watch: {
    modelValue (val) {
      this.visible = val
    },
    visible (val) {
      if (val === false) {
        this.buttonLoading = false
        this.timer = setTimeout(() => {
          this.wrapShow = false
          this.removeScrollEffect()
        }, 300)
      } else {
        if (this.lastVisible !== val) {
          this.modalIndex = this.handleGetModalIndex()
          lastVisibleIncrease()
        }

        if (this.timer) clearTimeout(this.timer)
        this.wrapShow = true
        if (!this.scrollable) {
          this.addScrollEffect()
        }
      }
      this.broadcast('Table', 'on-visible-change', val)
      this.broadcast('Slider', 'on-visible-change', val) // #2852
      this.$emit('visible-change', val)
      this.lastVisible = val
      this.lastVisibleIndex = lastVisibleIndex
    },
    loading (val) {
      if (!val) {
        this.buttonLoading = false
      }
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

    // ESC close
    document.addEventListener('keydown', this.EscClose)
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('update:modelValue', false)
      this.$emit('on-cancel')
    },
    handleMask () {
      if (this.maskClosable && this.showMask && !window.getSelection().toString()) {
        this.close()
      }
    },
    handleWrapClick (event) {
      if (this.isMouseTriggerIn) {
        this.isMouseTriggerIn = false
        return
      }
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
      const className = event.target.getAttribute('class')
      if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask()
    },
    handleMousedown () {
      this.isMouseTriggerIn = true
    },
    cancel () {
      this.close()
    },
    ok () {
      if (this.loading) {
        this.buttonLoading = true
      } else {
        this.visible = false
        this.$emit('update:modelValue', false)
      }
      this.$emit('on-ok')
    },
    EscClose (e) {
      if (this.visible) {
        if (e.keyCode === 27) {
          this.close()
        }
      }
    },
    animationFinish () {
      this.$emit('on-hidden')
    },
    handleMoveStart (event) {
      if (!this.draggable) return false

      const $content = this.$refs.content
      const rect = $content.getBoundingClientRect()
      this.dragData.x = rect.x || rect.left
      this.dragData.y = rect.y || rect.top

      const distance = {
        x: event.clientX,
        y: event.clientY
      }

      this.dragData.dragX = distance.x
      this.dragData.dragY = distance.y

      this.dragData.dragging = true

      on(window, 'mousemove', this.handleMoveMove)
      on(window, 'mouseup', this.handleMoveEnd)
    },
    handleMoveMove (event) {
      if (!this.dragData.dragging) return false

      const distance = {
        x: event.clientX,
        y: event.clientY
      }

      const diff_distance = {
        x: distance.x - this.dragData.dragX,
        y: distance.y - this.dragData.dragY
      }

      this.dragData.x += diff_distance.x
      this.dragData.y += diff_distance.y

      this.dragData.dragX = distance.x
      this.dragData.dragY = distance.y
    },
    handleMoveEnd () {
      this.dragData.dragging = false
      off(window, 'mousemove', this.handleMoveMove)
      off(window, 'mouseup', this.handleMoveEnd)
    },
    handleGetModalIndex () {
      modalIncrease()
      return modalIndex
    },
    handleClickModal () {
      if (this.draggable) {
        if (lastVisibleIndex !== this.lastVisibleIndex) {
          this.lastVisibleIndex = lastVisibleIndex
          return
        }
        this.modalIndex = this.handleGetModalIndex()
      }
    }
  },
  beforeUnmont () {
    document.removeEventListener('keydown', this.EscClose)
    this.removeScrollEffect()
  }
}
</script>
