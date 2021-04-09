<template>
  <li
    :class="classes"
    @click.stop="select"
    @mousedown.prevent
  >
    <slot>{{ showLabel }}</slot>
  </li>
</template>
<script>
import Emitter from '../mixins/emitter'
import mixinsForm from '../mixins/form'
import { findComponentUpward } from '../utils/assist'

const prefixCls = 'ivu-select-item'

export default {
  name: 'VOption',
  componentName: 'select-item',
  mixins: [Emitter, mixinsForm],
  inject: ['selectComponent'],
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
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
    isFocused: {
      type: Boolean,
      default: false
    },
    // 4.0.0
    tag: {
      type: [String, Number]
    }
  },
  emits: ['on-select-selected', 'on-clickoutside'],
  data () {
    return {
      searchLabel: '', // the slot value (textContent)
      autoComplete: false,
      dataSelected: false,
      dataIsFocused: false
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-disabled`]: this.itemDisabled,
                      [`${prefixCls}-selected`]: this.dataSelected && !this.autoComplete,
                      [`${prefixCls}-focus`]: this.dataIsFocused
                    }
      ]
    },
    showLabel () {
      return (this.label) ? this.label : this.value
    },
    optionLabel () {
      return this.label || (this.$el && this.$el.textContent)
    }
  },
  watch: {
    selected (value) {
      this.dataSelected = value
    },
    isFocused (value) {
      this.dataIsFocused = value
    }
  },
  mounted () {
    const Select = this.selectComponent
    if (Select) this.autoComplete = Select.autoComplete

    this.selectComponent.optionComponents.push(this)
  },
  beforeUnmount () {
    const index = this.selectComponent.optionComponents.indexOf(this)

    this.selectComponent.optionComponents.splice(index, 1)
  },
  methods: {
    select () {
      if (this.itemDisabled) return false

      this.selectComponent.mitt.emit('on-select-selected', {
        value: this.value,
        label: this.optionLabel,
        tag: this.tag
      })
      this.$emit('on-select-selected', {
        value: this.value,
        label: this.optionLabel,
        tag: this.tag
      })
    }
  }
}
</script>
