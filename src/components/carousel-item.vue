<template>
  <div
    :class="prefixCls"
    :style="styles"
  >
    <slot />
  </div>
</template>
<script>
const prefixCls = 'ivu-carousel-item'

export default {
  componentName: 'carousel-item',
  name: 'CarouselItem',
  data () {
    return {
      prefixCls: prefixCls,
      width: 0,
      height: 'auto',
      left: 0
    }
  },
  computed: {
    styles () {
      return {
        width: `${this.width}px`,
        height: `${this.height}`,
        left: `${this.left}px`
      }
    }
  },
  watch: {
    width (val) {
      if (val && this.$parent.loop) {
        this.$nextTick(() => {
          this.$parent.initCopyTrackDom()
        })
      }
    },
    height (val) {
      if (val && this.$parent.loop) {
        this.$nextTick(() => {
          this.$parent.initCopyTrackDom()
        })
      }
    }
  },
  mounted () {
    this.$parent.slotChange()
  },
  beforeUnmont () {
    this.$parent.slotChange()
  }
}
</script>
