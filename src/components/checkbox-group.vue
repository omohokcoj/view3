<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { findComponentsDownward, oneOf } from '../utils/assist'
import Emitter from '../mixins/emitter'

const prefixCls = 'ivu-checkbox-group'

export default {
  name: 'CheckboxGroup',
  mixins: [Emitter],
  props: {
    modelValue: {
      type: Array,
      default () {
        return []
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default () {
        return 'default'
      }
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
                      [`ivu-checkbox-${this.size}`]: !!this.size
                    }
      ]
    }
  },
  watch: {
    modelValue () {
      this.updateModel(true)
    }
  },
  mounted () {
    this.updateModel(true)
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'Checkbox')

      if (this.childrens) {
        this.childrens.forEach(child => {
          child.model = this.modelValue

          if (update) {
            child.currentValue = this.modelValue.indexOf(child.label) >= 0
            child.group = true
          }
        })
      }
    },
    change (data) {
      this.currentValue = data
      this.$emit('update:modelValue', data)
      this.$emit('on-change', data)
      this.dispatch('FormItem', 'on-form-change', data)
    }
  }
}
</script>
