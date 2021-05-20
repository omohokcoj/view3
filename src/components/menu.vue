<template>
  <ul
    :class="classes"
    :style="styles"
  >
    <slot />
  </ul>
</template>
<script>
import { oneOf, findComponentsDownward, findComponentsUpward } from '../utils/assist'
import Emitter from '../mixins/emitter'

const prefixCls = 'ivu-menu'

export default {
  name: 'Menu',
  mixins: [Emitter],
  props: {
    mode: {
      validator (value) {
        return oneOf(value, ['horizontal', 'vertical'])
      },
      default: 'vertical'
    },
    theme: {
      validator (value) {
        return oneOf(value, ['light', 'dark', 'primary'])
      },
      default: 'light'
    },
    activeName: {
      type: [String, Number]
    },
    openNames: {
      type: Array,
      default () {
        return []
      }
    },
    accordion: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '240px'
    }
  },
  emits: ['on-select', 'on-open-change'],
  data () {
    return {
      currentActiveName: this.activeName,
      openedNames: [],
      children: []
    }
  },
  computed: {
    classes () {
      let theme = this.theme
      if (this.mode === 'vertical' && this.theme === 'primary') theme = 'light'

      return [
                    `${prefixCls}`,
                    `${prefixCls}-${theme}`,
                    {
                      [`${prefixCls}-${this.mode}`]: this.mode
                    }
      ]
    },
    styles () {
      const style = {}

      if (this.mode === 'vertical') style.width = this.width

      return style
    }
  },
  watch: {
    openNames (names) {
      this.openedNames = names
    },
    activeName (val) {
      this.currentActiveName = val
    },
    currentActiveName () {
      this.updateActiveName()
    }
  },
  mounted () {
    this.openedNames = [...this.openNames]
    this.updateOpened()
    this.$nextTick(() => this.updateActiveName())
    this.mitt.on('on-menu-item-select', (name) => {
      this.currentActiveName = name
      this.$emit('on-select', name)
    })
  },
  methods: {
    updateActiveName () {
      if (this.currentActiveName === undefined) {
        this.currentActiveName = -1
      }
      this.broadcast('Submenu', 'on-update-active-name', this.currentActiveName)
      this.broadcast('MenuItem', 'on-update-active-name', this.currentActiveName)
    },
    updateOpenKeys (name) {
      const names = [...this.openedNames]
      const index = names.indexOf(name)
      if (this.accordion) {
        findComponentsDownward(this, 'Submenu').forEach(item => {
          item.opened = false
        })
      }
      if (index >= 0) {
        let currentSubmenu = null
        findComponentsDownward(this, 'Submenu').forEach(item => {
          if (item.name === name) {
            currentSubmenu = item
            item.opened = false
          }
        })
        findComponentsUpward(currentSubmenu, 'Submenu').forEach(item => {
          item.opened = true
        })
        findComponentsDownward(currentSubmenu, 'Submenu').forEach(item => {
          item.opened = false
        })
      } else {
        if (this.accordion) {
          let currentSubmenu = null
          findComponentsDownward(this, 'Submenu').forEach(item => {
            if (item.name === name) {
              currentSubmenu = item
              item.opened = true
            }
          })
          findComponentsUpward(currentSubmenu, 'Submenu').forEach(item => {
            item.opened = true
          })
        } else {
          findComponentsDownward(this, 'Submenu').forEach(item => {
            if (item.name === name) item.opened = true
          })
        }
      }
      const openedNames = findComponentsDownward(this, 'Submenu').filter(item => item.opened).map(item => item.name)
      this.openedNames = [...openedNames]
      this.$emit('on-open-change', openedNames)
    },
    updateOpened () {
    },
    handleEmitSelectEvent (name) {
      this.$emit('on-select', name)
    }
  }
}
</script>
