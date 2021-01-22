<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { findComponentsDownward } from '../utils/assist'

const prefixCls = 'ivu-collapse'

export default {
  name: 'Collapse',
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Array, String],
      required: false,
      default: null
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-change', 'update:modelValue'],
  data () {
    return {
      currentValue: this.modelValue,
      childrens: []
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-simple`]: this.simple
                    }
      ]
    }
  },
  watch: {
    modelValue (val) {
      this.currentValue = val
    },
    currentValue () {
      this.setActive()
    }
  },
  mounted () {
    this.setActive()
  },
  methods: {
    setActive () {
      const activeKey = this.getActiveKey()

      this.childrens = findComponentsDownward(this, 'Panel')

      this.childrens.forEach((child, index) => {
        const name = child.name || index.toString()

        child.isActive = activeKey.indexOf(name) > -1
        child.index = index
      })
    },
    getActiveKey () {
      let activeKey = this.currentValue || []
      const accordion = this.accordion

      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey]
      }

      if (accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]]
      }

      for (let i = 0; i < activeKey.length; i++) {
        activeKey[i] = activeKey[i].toString()
      }

      return activeKey
    },
    toggle (data) {
      const name = data.name.toString()
      let newActiveKey = []

      if (this.accordion) {
        if (!data.isActive) {
          newActiveKey.push(name)
        }
      } else {
        const activeKey = this.getActiveKey()
        const nameIndex = activeKey.indexOf(name)

        if (data.isActive) {
          if (nameIndex > -1) {
            activeKey.splice(nameIndex, 1)
          }
        } else {
          if (nameIndex < 0) {
            activeKey.push(name)
          }
        }

        newActiveKey = activeKey
      }

      this.currentValue = newActiveKey
      this.setActive()

      this.$emit('update:modelValue', newActiveKey)
      this.$emit('on-change', newActiveKey)
    }
  }
}
</script>
