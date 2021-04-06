<template>
  <div
    :class="headCls"
    @click="onHeaderClick"
  >
    <span
      v-if="$slots.prefix || prefix"
      :class="[prefixCls + '-prefix']"
    >
      <slot name="prefix">
        <Icon
          v-if="prefix"
          :type="prefix"
        />
      </slot>
    </span>
    <div
      v-for="(item, index) in selectedMultiple"
      class="ivu-tag ivu-tag-checked"
    >
      <template v-if="maxTagCount === undefined || index < maxTagCount">
        <span
          class="ivu-tag-text"
          :class="{ 'ivu-select-multiple-tag-hidden': item.disabled }"
        >{{ item.tag !== undefined ? item.tag : item.label }}</span>
        <Icon
          v-if="!item.disabled"
          type="ios-close"
          size="large"
          @click.capture.stop="removeTag(item)"
        />
      </template>
    </div>
    <div
      v-if="maxTagCount !== undefined && selectedMultiple.length > maxTagCount"
      class="ivu-tag ivu-tag-checked"
    >
      <span class="ivu-tag-text ivu-select-max-tag">
        <template v-if="maxTagPlaceholder">{{ maxTagPlaceholder(selectedMultiple.length - maxTagCount) }}</template>
        <template v-else>+ {{ selectedMultiple.length - maxTagCount }}...</template>
      </span>
    </div>
    <span
      v-show="singleDisplayValue"
      :class="singleDisplayClasses"
    >{{ singleDisplayValue }}</span>
    <input
      v-if="filterable"
      :id="inputElementId"
      ref="input"
      v-model="query"
      type="text"
      :disabled="disabled"
      :class="[prefixCls + '-input']"
      :placeholder="showPlaceholder ? localePlaceholder : ''"
      :style="inputStyle"
      autocomplete="off"
      spellcheck="false"
      @keydown="resetInputState"
      @keydown.delete="handleInputDelete"
      @keydown.enter="handleInputEnter"
      @focus="onInputFocus"

      @blur="onInputBlur"
    >
    <Icon
      v-if="resetSelect"
      type="ios-close-circle"
      :class="[prefixCls + '-arrow']"
      @click.native.stop="onClear"
    />
    <Icon
      v-if="!resetSelect && !remote"
      :type="arrowType"
      :custom="customArrowType"
      :size="arrowSize"
      :class="[prefixCls + '-arrow']"
    />
  </div>
</template>
<script>
import Icon from './icon'
import Locale from '../mixins/locale'

const prefixCls = 'ivu-select'

export default {
  name: 'SelectHead',
  components: { Icon },
  mixins: [Locale],
  inject: ['selectComponent'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    initialLabel: {
      type: [String, Number, Array]
    },
    values: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: [Function, Boolean],
      default: false
    },
    inputElementId: {
      type: String
    },
    placeholder: {
      type: String
    },
    queryProp: {
      type: String,
      default: ''
    },
    prefix: {
      type: String
    },
    // 3.4.0
    maxTagCount: {
      type: Number
    },
    // 3.4.0
    maxTagPlaceholder: {
      type: Function
    },
    // 4.0.0
    allowCreate: {
      type: Boolean
    },
    // 4.0.0
    showCreateItem: {
      type: Boolean
    }
  },
  emits: ['on-input-blur', 'on-query-change', 'on-input-focus', 'on-keydown'],
  data () {
    return {
      prefixCls: prefixCls,
      query: '',
      inputLength: 20,
      remoteInitialLabel: this.initialLabel,
      preventRemoteCall: false
    }
  },
  computed: {
    singleDisplayClasses () {
      const { filterable, multiple, showPlaceholder } = this
      return [{
        [prefixCls + '-head-with-prefix']: this.$slots.prefix || this.prefix,
        [prefixCls + '-placeholder']: showPlaceholder && !filterable,
        [prefixCls + '-selected-value']: !showPlaceholder && !multiple && !filterable
      }]
    },
    singleDisplayValue () {
      if ((this.multiple && this.values.length > 0) || this.filterable) return ''
      return `${this.selectedSingle}` || this.localePlaceholder
    },
    showPlaceholder () {
      let status = false
      if (!this.multiple) {
        const value = this.values[0]
        if (typeof value === 'undefined' || String(value).trim() === '') {
          status = !this.remoteInitialLabel
        }
      } else {
        if (!this.values.length > 0) {
          status = true
        }
      }
      return status
    },
    resetSelect () {
      return !this.showPlaceholder && this.clearable
    },
    inputStyle () {
      const style = {}

      if (this.multiple) {
        if (this.showPlaceholder) {
          style.width = '100%'
        } else {
          style.width = `${this.inputLength}px`
        }
      }

      return style
    },
    localePlaceholder () {
      if (this.placeholder === undefined) {
        return this.t('i.select.placeholder')
      } else {
        return this.placeholder
      }
    },
    selectedSingle () {
      const selected = this.values[0]
      return selected ? selected.label : (this.remoteInitialLabel || '')
    },
    selectedMultiple () {
      return this.multiple ? this.values : []
    },
    // 使用 prefix 时，在 filterable
    headCls () {
      return {
        [`${prefixCls}-head-flex`]: this.filterable && (this.$slots.prefix || this.prefix)
      }
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
    values ([value]) {
      if (!this.filterable) return
      this.preventRemoteCall = true
      if (this.multiple) {
        this.query = ''
        this.preventRemoteCall = false // this should be after the query change setter above
        return
      }
      // #982
      if (typeof value === 'undefined' || value === '' || value === null) this.query = ''
      else this.query = value.label
      this.$nextTick(() => this.preventRemoteCall = false) // this should be after the query change setter above
    },
    query (val) {
      if (this.preventRemoteCall) {
        this.preventRemoteCall = false
        return
      }

      this.$emit('on-query-change', val)
    },
    queryProp (query) {
      if (query !== this.query) this.query = query
    }
  },
  methods: {
    onInputFocus () {
      this.$emit('on-input-focus')
    },
    onInputBlur () {
      if (this.showCreateItem) return
      if (!this.values.length) this.query = '' // #5155
      this.$emit('on-input-blur')
    },
    removeTag (value) {
      if (this.disabled) return false
      this.selectComponent.onOptionClick(value)
    },
    resetInputState () {
      this.inputLength = this.$refs.input.value.length * 12 + 20
      this.$emit('on-keydown')
    },
    handleInputDelete (e) {
      const targetValue = e.target.value
      if (this.multiple && this.selectedMultiple.length && this.query === '' && targetValue === '') {
        this.removeTag(this.selectedMultiple[this.selectedMultiple.length - 1])
      }
    },
    handleInputEnter () {
      this.$emit('on-enter')
    },
    onHeaderClick (e) {
      if (this.filterable && e.target === this.$el) {
        this.$refs.input.focus()
      }
    },
    onClear () {
      this.$emit('on-clear')
    }
  }
}
</script>
