<template>
  <div :class="classes">
    <label
      v-if="label || $slots.label"
      :class="[prefixCls + '-label']"
      :for="labelFor"
      :style="labelStyles"
    ><slot name="label">{{ label }}{{ FormInstance.colon }}</slot></label>
    <div
      :class="[prefixCls + '-content']"
      :style="contentStyles"
    >
      <slot />
      <transition name="fade">
        <div
          v-if="validateState === 'error' && showMessage && FormInstance.showMessage"
          :class="[prefixCls + '-error-tip']"
        >
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import Emitter from '../mixins/emitter'

const prefixCls = 'ivu-form-item'

function getPropByPath (obj, path) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0

  for (let len = keyArr.length; i < len - 1; ++i) {
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      throw new Error('[iView warn]: please transfer a valid prop path to form item!')
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  }
}

export default {
  name: 'FormItem',
  mixins: [Emitter],
  inject: ['FormInstance'],
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: Number
    },
    prop: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, Array]
    },
    error: {
      type: String
    },
    validateStatus: {
      type: Boolean
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    labelFor: {
      type: String
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      isRequired: false,
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {}
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-required`]: this.required || this.isRequired,
                      [`${prefixCls}-error`]: this.validateState === 'error',
                      [`${prefixCls}-validating`]: this.validateState === 'validating'
                    }
      ]
    },
    // form() {
    //    let parent = this.$parent;
    //    while (parent.$options.name !== 'iForm') {
    //        parent = parent.$parent;
    //    }
    //    return parent;
    // },
    fieldValue () {
      const model = this.FormInstance.model
      if (!model || !this.prop) { return }

      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path).v
    },
    labelStyles () {
      const style = {}
      const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.FormInstance.labelWidth

      if (labelWidth || labelWidth === 0) {
        style.width = `${labelWidth}px`
      }
      return style
    },
    contentStyles () {
      const style = {}
      const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.FormInstance.labelWidth

      if (labelWidth || labelWidth === 0) {
        style.marginLeft = `${labelWidth}px`
      }
      return style
    }
  },
  watch: {
    error: {
      handler (val) {
        this.validateMessage = val
        this.validateState = val ? 'error' : ''
      },
      immediate: true
    },
    validateStatus (val) {
      this.validateState = val
    },
    rules () {
      this.setRules()
    },
    required (n, o) {
      this.isRequired = n
      if (o && !n) {
        this.resetField()
      }
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('VForm', 'on-form-item-add', this)

      Object.defineProperty(this, 'initialValue', {
        value: this.fieldValue
      })

      this.setRules()
    }

    this.FormInstance.mitt.on('rules-update', this.setRules)
  },
  beforeUnmount () {
    this.dispatch('VForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      const rules = this.getRules()
      if (rules.length && this.required) {
        return
      } else if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required
        })
      } else if (this.required) {
        this.isRequired = this.required
      } else if (!rules.length) {
        this.isRequired = false
      }

      this.mitt.off('on-form-blur', this.onFieldBlur)
      this.mitt.off('on-form-change', this.onFieldChange)
      this.mitt.on('on-form-blur', this.onFieldBlur)
      this.mitt.on('on-form-change', this.onFieldChange)
    },
    getRules () {
      let formRules = this.FormInstance.rules
      const selfRules = this.rules

      formRules = formRules ? formRules[this.prop] : []

      return [].concat(selfRules || formRules || [])
    },
    getFilteredRule (trigger) {
      const rules = this.getRules()

      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        if (!this.required) {
          callback()
          return true
        } else {
          rules = [{ required: true }]
        }
      }

      this.validateState = 'validating'

      const descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)

        this.FormInstance && this.FormInstance.$emit('on-validate', this.prop, !errors, this.validateMessage || null)
      })
      this.validateDisabled = false
    },
    setError (message) {
      this.validateState = 'error'
      this.validateMessage = message
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''

      const model = this.FormInstance.model
      const value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      const prop = getPropByPath(model, path)

      //                if (Array.isArray(value) && value.length > 0) {
      //                    this.validateDisabled = true;
      //                    prop.o[prop.k] = [];
      //                } else if (value !== this.initialValue) {
      //                    this.validateDisabled = true;
      //                    prop.o[prop.k] = this.initialValue;
      //                }
      if (Array.isArray(value)) {
        this.validateDisabled = true
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        this.validateDisabled = true
        prop.o[prop.k] = this.initialValue
      }
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }

      this.validate('change')
    }
  }
}
</script>
