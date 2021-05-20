<template>
  <label :class="wrapClasses">
    <span :class="checkboxClasses">
      <span :class="innerClasses" />
      <input
        v-if="group"
        v-model="model"
        type="checkbox"
        :class="inputClasses"
        :disabled="itemDisabled"
        :value="label"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
      <input
        v-else
        type="checkbox"
        :class="inputClasses"
        :disabled="itemDisabled"
        :checked="currentValue"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
    </span>
    <slot><span v-if="showSlot">{{ label }}</span></slot>
  </label>
</template>
<script>
import { findComponentUpward, oneOf } from '../utils/assist'
import Emitter from '../mixins/emitter'
import mixinsForm from '../mixins/form'

const prefixCls = 'ivu-checkbox'

export default {
  name: 'Checkbox',
  mixins: [Emitter, mixinsForm],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default () {
        return 'default'
      }
    },
    name: {
      type: String
    },
    // 4.0.0
    border: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-change', 'update:modelValue'],
  data () {
    return {
      model: [],
      currentValue: this.modelValue,
      group: false,
      showSlot: true,
      parent: findComponentUpward(this, 'CheckboxGroup'),
      focusInner: false
    }
  },
  computed: {
    wrapClasses () {
      return [
                    `${prefixCls}-wrapper`,
                    {
                      [`${prefixCls}-group-item`]: this.group,
                      [`${prefixCls}-wrapper-checked`]: this.currentValue,
                      [`${prefixCls}-wrapper-disabled`]: this.itemDisabled,
                      [`${prefixCls}-${this.size}`]: !!this.size,
                      [`${prefixCls}-border`]: this.border
                    }
      ]
    },
    checkboxClasses () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-checked`]: this.currentValue,
                      [`${prefixCls}-disabled`]: this.itemDisabled,
                      [`${prefixCls}-indeterminate`]: this.indeterminate
                    }
      ]
    },
    innerClasses () {
      return [
                    `${prefixCls}-inner`,
                    {
                      [`${prefixCls}-focus`]: this.focusInner
                    }
      ]
    },
    inputClasses () {
      return `${prefixCls}-input`
    }
  },
  watch: {
    modelValue (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else if ([null, undefined, ''].includes(val)) {
        this.updateModel()
      } else {
        throw 'Value should be trueValue or falseValue.'
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'CheckboxGroup')

    if (this.parent) {
      this.group = true
    }

    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
      this.showSlot = this.$slots.default !== undefined
    }
  },
  methods: {
    change (event) {
      if (this.itemDisabled) {
        return false
      }

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('update:modelValue', value)

      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('FormItem', 'on-form-change', value)
      }
    },
    updateModel () {
      this.currentValue = this.modelValue === this.trueValue
    },
    onBlur () {
      this.focusInner = false
    },
    onFocus () {
      this.focusInner = true
    }
  }
}
</script>
