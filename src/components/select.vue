<template>
  <div
    v-click-outside:[capture]="onClickOutside"
    v-click-outside:[capture].mousedown="onClickOutside"
    v-click-outside:[capture].touchstart="onClickOutside"
    :class="classes"
  >
    <div
      ref="reference"

      :class="selectionCls"
      :tabindex="selectTabindex"

      @blur="toggleHeaderFocus"
      @focus="toggleHeaderFocus"

      @click="toggleMenu"
      @keydown.esc="handleKeydown"
      @keydown.enter="handleKeydown"
      @keydown.up.prevent="handleKeydown"
      @keydown.down.prevent="handleKeydown"
      @keydown.tab="handleKeydown"
      @keydown.delete="handleKeydown"

      @mouseenter="hasMouseHoverHead = true"
      @mouseleave="hasMouseHoverHead = false"
    >
      <slot name="input">
        <input
          type="hidden"
          :name="name"
          :value="publicValue"
        >
        <SelectHead
          :filterable="filterable"
          :multiple="multiple"
          :values="values"
          :clearable="canBeCleared"
          :prefix="prefix"
          :disabled="itemDisabled"
          :remote="remote"
          :input-element-id="elementId"
          :initial-label="initialLabel"
          :placeholder="placeholder"
          :query-prop="query"
          :max-tag-count="maxTagCount"
          :max-tag-placeholder="maxTagPlaceholder"
          :allow-create="allowCreate"
          :show-create-item="showCreateItem"

          @on-query-change="onQueryChange"
          @on-input-focus="isFocused = true"
          @on-input-blur="isFocused = false"
          @on-clear="clearSingleSelect"
          @on-enter="handleCreateItem"
        >
          <slot
            slot="prefix"
            name="prefix"
          />
        </SelectHead>
      </slot>
    </div>
    <transition name="transition-drop">
      <SelectDropdown
        v-show="dropVisible"
        ref="dropdown"
        v-transfer-dom
        :class="dropdownCls"
        :placement="placement"
        :data-transfer="transfer"
        :transfer="transfer"
      >
        <ul
          v-show="showNotFoundLabel && !allowCreate"
          :class="[prefixCls + '-not-found']"
        >
          <li>{{ localeNotFoundText }}</li>
        </ul>

        <FunctionalOptions
          v-if="(!remote) || (remote && !loading)"
          :options="selectOptions"
          :slot-update-hook="updateSlotOptions"
          :slot-options="slotOptions"
          :class="prefixCls + '-dropdown-list'"
        >
          <li
            v-if="showCreateItem"
            :class="prefixCls + '-item'"
            @click="handleCreateItem"
          >
            {{ query }}
            <Icon
              type="md-return-left"
              :class="prefixCls + '-item-enter'"
            />
          </li>
        </FunctionalOptions>
        <ul
          v-else
          :class="prefixCls + '-dropdown-list'"
        >
          <li
            v-if="showCreateItem"
            :class="prefixCls + '-item'"
            @click="handleCreateItem"
          >
            {{ query }}
            <Icon
              type="md-return-left"
              :class="prefixCls + '-item-enter'"
            />
          </li>
        </ul>

        <ul
          v-show="loading"
          :class="[prefixCls + '-loading']"
        >
          {{ localeLoadingText }}
        </ul>
      </SelectDropdown>
    </transition>
  </div>
</template>

<script>
import SelectDropdown from './select-dropdown'
import Icon from './icon'
import { directive as clickOutside } from '../directives/v-click-outside-x'
import TransferDom from '../directives/transfer-dom'
import { oneOf, findComponentsDownward } from '../utils/assist'
import Emitter from '../mixins/emitter'
import mixinsForm from '../mixins/form'
import Locale from '../mixins/locale'
import SelectHead from './select-head'
import FunctionalOptions from './functional-options'

const prefixCls = 'ivu-select'
const optionRegexp = /^voption$|^option$/i
const optionGroupRegexp = /option-?group/i

const findChild = (instance, checkFn) => {
  return findComponentsDownward(instance, 'VOption').find(checkFn)
}

const findOptionsInVNode = (node) => {
  if (node.type && node.type.name && node.type.name.match(optionRegexp)) return [node]
  if (!node.children) return []
  const children = Array.isArray(node.children) ? node.children : (typeof node.children === 'function' ? node.children() : [])
  const options = children.reduce(
    (arr, el) => [...arr, ...findOptionsInVNode(el)], []
  ).filter(Boolean)
  return options.length > 0 ? options : []
}

const extractOptions = (options) => options.reduce((options, slotEntry) => {
  return options.concat(findOptionsInVNode(slotEntry))
}, [])

const applyProp = (node, propName, value) => {
  return {
    ...node,
    props: {
      ...node.props,
      [propName]: value
    }
  }
}

const getNestedProperty = (obj, path) => {
  const keys = path.split('.')
  return keys.reduce((o, key) => o && o[key] || null, obj)
}

const getOptionLabel = option => {
  if (option.props.label) return option.props.label

  if (option.component) {
    return option.component.proxy.$el.innerHTML.trim()
  } else {
    return option.children.default().map((e) => e.children).join().trim()
  }
}

const checkValuesNotEqual = (value, publicValue, values) => {
  const strValue = JSON.stringify(value)
  const strPublic = JSON.stringify(publicValue)
  const strValues = JSON.stringify(values.map(item => {
    return item.value
  }))
  return strValue !== strPublic || strValue !== strValues || strValues !== strPublic
}

const ANIMATION_TIMEOUT = 300

export default {
  name: 'VSelect',
  components: { FunctionalOptions, SelectDropdown, SelectHead, Icon },
  directives: { clickOutside, TransferDom },
  mixins: [Emitter, Locale, mixinsForm],
  provide () {
    return {
      selectComponent: this
    }
  },
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    label: {
      type: [String, Number, Array],
      default: ''
    },
    defaultLabel: {
      type: [String, Number, Array],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function
    },
    remoteMethod: {
      type: Function
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default () {
        return 'default'
      }
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    notFoundText: {
      type: String
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end'])
      },
      default: 'bottom-start'
    },
    transfer: {
      type: Boolean,
      default () {
        return false
      }
    },
    autoComplete: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    elementId: {
      type: String
    },
    transferClassName: {
      type: String
    },
    prefix: {
      type: String
    },
    maxTagCount: {
      type: Number
    },
    maxTagPlaceholder: {
      type: Function
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    capture: {
      type: Boolean,
      default () {
        return true
      }
    },
    filterByLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'on-change', 'on-open-change', 'on-query-change', 'on-select'],
  data () {
    return {
      prefixCls: prefixCls,
      values: [],
      dropDownWidth: 0,
      visible: false,
      focusIndex: -1,
      isFocused: false,
      query: '',
      initialLabel: this.label,
      hasMouseHoverHead: false,
      slotOptions: [],
      optionComponents: [],
      caretPosition: -1,
      lastRemoteQuery: '',
      unchangedQuery: true,
      hasExpectedValue: false,
      isTyping: false,
      preventRemoteCall: false,
      filterQueryChange: false
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-visible`]: this.visible,
                      [`${prefixCls}-disabled`]: this.itemDisabled,
                      [`${prefixCls}-multiple`]: this.multiple,
                      [`${prefixCls}-single`]: !this.multiple,
                      [`${prefixCls}-${this.size}`]: !!this.size
                    }
      ]
    },
    dropdownCls () {
      return {
        [prefixCls + '-dropdown-transfer']: this.transfer,
        [prefixCls + '-multiple']: this.multiple && this.transfer,
        'ivu-auto-complete': this.autoComplete,
        [this.transferClassName]: this.transferClassName
      }
    },
    selectionCls () {
      return {
        [`${prefixCls}-selection`]: !this.autoComplete,
        [`${prefixCls}-selection-focused`]: this.isFocused
      }
    },
    localeNotFoundText () {
      if (typeof this.notFoundText === 'undefined') {
        return this.t('i.select.noMatch')
      } else {
        return this.notFoundText
      }
    },
    localeLoadingText () {
      if (typeof this.loadingText === 'undefined') {
        return this.t('i.select.loading')
      } else {
        return this.loadingText
      }
    },
    showCreateItem () {
      let state = false
      if (this.allowCreate && this.query !== '') {
        state = true
        const $options = findComponentsDownward(this, 'VOption')
        if ($options && $options.length) {
          if ($options.find(item => item.optionLabel === this.query)) state = false
        }
      }
      return state
    },
    transitionName () {
      return this.placement === 'bottom' ? 'slide-up' : 'slide-down'
    },
    dropVisible () {
      let status = true
      const noOptions = !this.selectOptions || this.selectOptions.length === 0
      if (!this.loading && this.query === '' && noOptions) status = false

      if (this.autoComplete && noOptions) status = false

      return this.visible && status
    },
    showNotFoundLabel () {
      const { loading, remote, selectOptions } = this
      return selectOptions && selectOptions.length === 0 && (!remote || (remote && !loading))
    },
    publicValue () {
      if (this.labelInValue) {
        return this.multiple ? this.values : this.values[0]
      } else {
        return this.multiple ? this.values.map(option => option.value) : (this.values[0] || {}).value
      }
    },
    canBeCleared () {
      const uiStateMatch = this.hasMouseHoverHead
      const qualifiesForClear = !this.multiple && !this.itemDisabled && this.clearable
      return uiStateMatch && qualifiesForClear && this.reset // we return a function
    },
    selectOptions () {
      const selectOptions = []
      const slotOptions = (this.slotOptions || [])
      let optionCounter = -1
      const currentIndex = this.focusIndex
      const selectedValues = this.values.filter(Boolean).map(({ value }) => value)
      if (this.autoComplete) {
        const copyChildren = (node, fn) => {
          return {
            ...node,
            children: Array.isArray(node.children) ? node.children.map(fn).map(child => copyChildren(child, fn)) : node.children
          }
        }

        const autoCompleteOptions = extractOptions(slotOptions)
        const selectedSlotOption = autoCompleteOptions[currentIndex]

        return slotOptions.map(node => {
          if (node === selectedSlotOption || getNestedProperty(node, 'props.value') == this.modelValue) {
            return applyProp(node, 'isFocused', true)
          }

          return copyChildren(node, (child) => {
            if (!selectedSlotOption || child.props.value !== selectedSlotOption.props.value) return child

            this.optionComponents.forEach((component) => {
              component.dataIsFocused = component.$.vnode.key === selectedSlotOption.props.key
            })

            return applyProp(child, 'isFocused', true)
          })
        })
      }

      for (const option of slotOptions) {
        if (option.type.name.match(optionGroupRegexp)) {
          let children = option.children

          if (this.filterable && this.isTyping) {
            children = children.filter(
              (option) => this.validateOption(option)
            )
          }

          children = children.map(opt => {
            optionCounter = optionCounter + 1
            return this.processOption(opt, selectedValues, optionCounter == currentIndex)
          })

          if (children.length > 0) {
            selectOptions.push({ ...option, componentOptions: { ...cOptions, children: children } })
          }
        } else {
          if (this.filterQueryChange) {
            const optionPassesFilter = this.filterable ? this.validateOption(option) : option
            if (!optionPassesFilter) continue
          }

          optionCounter = optionCounter + 1
          selectOptions.push(this.processOption(option, selectedValues, optionCounter == currentIndex))
        }
      }

      return selectOptions
    },
    flatOptions () {
      return extractOptions(this.selectOptions)
    },
    selectTabindex () {
      return this.itemDisabled || this.filterable ? -1 : 0
    },
    remote () {
      return typeof this.remoteMethod === 'function'
    }
  },
  watch: {
    modelValue (value) {
      const { getInitialValue, getOptionData, publicValue, values } = this

      this.checkUpdateStatus()

      if (value === '') {
        this.values = []
      } else if (checkValuesNotEqual(value, publicValue, values)) {
        this.$nextTick(() => {
          this.values = getInitialValue().map(getOptionData).filter(Boolean)
        })

        if (!this.multiple) {
          this.dispatch('FormItem', 'on-form-change', this.publicValue)
        }
      }
    },
    values (now, before) {
      const newValue = JSON.stringify(now)
      const oldValue = JSON.stringify(before)
      const values = now.map((v) => v.value)

      if (!this.autoComplete) {
        this.optionComponents.forEach((component, index) => {
          component.dataSelected = values.includes(component.value)
          component.dataIsFocused = values.includes(component.value)

          if (values.includes(component.value)) {
            this.focusIndex = index
          }
        })
      } else {
        this.focusIndex = 0
      }

      const vModelValue = (this.publicValue && this.labelInValue)
        ? (this.multiple ? this.publicValue.map(({ value }) => value) : this.publicValue.value)
        : this.publicValue
      const shouldEmitInput = newValue !== oldValue && vModelValue !== this.value
      if (shouldEmitInput) {
        this.$emit('update:modelValue', vModelValue)
        this.$emit('on-change', this.publicValue)
        this.dispatch('FormItem', 'on-form-change', this.publicValue)
      }
    },
    query (query) {
      this.$emit('on-query-change', query)
      const { remoteMethod, lastRemoteQuery } = this
      const hasValidQuery = query !== lastRemoteQuery || !lastRemoteQuery
      const shouldCallRemoteMethod = remoteMethod && hasValidQuery && !this.preventRemoteCall
      this.preventRemoteCall = false // remove the flag

      if (shouldCallRemoteMethod) {
        this.focusIndex = -1
        const promise = this.remoteMethod(query)
        this.initialLabel = ''
        if (promise && promise.then) {
          promise.then(options => {
            if (options) this.options = options
          })
        }
      }
      if (query !== '' && this.remote) this.lastRemoteQuery = query
    },
    loading (state) {
      if (state === false) {
        this.updateSlotOptions()
      }
    },
    isFocused (focused) {
      const el = this.filterable ? this.$el.querySelector('input[type="text"]') : this.$el
      el[this.isFocused ? 'focus' : 'blur']()

      const [selectedOption] = this.values
      if (selectedOption && this.filterable && !this.multiple && !focused) {
        const selectedLabel = String(selectedOption.label || selectedOption.value).trim()
        if (selectedLabel && this.query !== selectedLabel) {
          this.preventRemoteCall = true
          this.query = selectedLabel.trim()
        }
      }
    },
    focusIndex (index) {
      if (index < 0 || this.autoComplete) return
      const optionValue = this.flatOptions[index].props.value
      const optionInstance = findChild(this, (option) => {
        return option.value == optionValue
      })

      const bottomOverflowDistance = optionInstance.$el.getBoundingClientRect().bottom - this.$refs.dropdown.$el.getBoundingClientRect().bottom
      const topOverflowDistance = optionInstance.$el.getBoundingClientRect().top - this.$refs.dropdown.$el.getBoundingClientRect().top
      if (bottomOverflowDistance > 0) {
        this.$refs.dropdown.$el.scrollTop += bottomOverflowDistance
      }
      if (topOverflowDistance < 0) {
        this.$refs.dropdown.$el.scrollTop += topOverflowDistance
      }
    },
    dropVisible (open) {
      this.broadcast('SelectDropdown', open ? 'on-update-popper' : 'on-destroy-popper')
    },
    selectOptions () {
      if (this.hasExpectedValue && this.selectOptions.length > 0) {
        if (this.values.length === 0) {
          this.values = this.getInitialValue()
        }
        this.values = this.values.map(this.getOptionData).filter(Boolean)
        this.hasExpectedValue = false
      }

      this.broadcast('SelectDropdown', 'on-update-popper')
    },
    visible (state) {
      this.$emit('on-open-change', state)
    },
    slotOptions (options, old) {
      if (!this.remote) {
        const values = this.getInitialValue()

        if (this.flatOptions && this.flatOptions.length && values.length && !this.multiple) {
          this.values = values.map(this.getOptionData).filter(Boolean)
        }
      }

      if (options && old && options.length !== old.length) {
        this.broadcast('SelectDropdown', 'on-update-popper')
      }
    }
  },
  mounted () {
    this.updateSlotOptions()

    this.mitt.on('on-select-selected', this.onOptionClick)

    if (!this.remote && this.selectOptions.length > 0) {
      this.values = this.getInitialValue().map(value => {
        if (typeof value !== 'number' && !value) return null
        return this.getOptionData(value)
      }).filter(Boolean)
    }

    this.checkUpdateStatus()

    if (this.remote && this.modelValue && this.defaultLabel) {
      if (!this.multiple) {
        this.query = this.defaultLabel
      } else if (this.multiple && (this.defaultLabel instanceof Array) && this.value.length === this.defaultLabel.length) {
        const values = this.value.map((item, index) => {
          return {
            value: item,
            label: this.defaultLabel[index]
          }
        })
        this.$emit('on-set-default-options', JSON.parse(JSON.stringify(values)))
        setTimeout(() => {
          this.values = values
        })
      }
    }
  },
  beforeUnmont () {
    this.mitt.off('on-select-selected')
  },
  methods: {
    setQuery (query) {
      if (query) {
        this.onQueryChange(query)
        return
      }
      if (query === null) {
        this.onQueryChange('')
        this.values = []
        this.lastRemoteQuery = ''
      }
    },
    clearSingleSelect () {
      if (!this.multiple) this.$emit('update:modelValue', '')
      this.$emit('on-clear')
      this.hideMenu()
      if (this.clearable) this.reset()
    },
    getOptionData (value) {
      const option = this.flatOptions.find(({ props }) => props.value == value)
      if (!option) return null
      const label = getOptionLabel(option)
      const disabled = option.props.disabled
      return {
        value: value,
        label: label,
        disabled: disabled
      }
    },
    getInitialValue () {
      const { multiple, remote, modelValue } = this
      let initialValue = Array.isArray(modelValue) ? modelValue : [modelValue]
      if (!multiple && (typeof initialValue[0] === 'undefined' || (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))) initialValue = []
      if (remote && !multiple && modelValue) {
        const data = this.getOptionData(modelValue)
        this.query = data ? data.label : String(modelValue)
      }
      return initialValue.filter((item) => {
        return Boolean(item) || item === 0
      })
    },
    processOption (option, values, isFocused) {
      if (!option.props) return option
      const optionValue = option.props.value
      const disabled = option.props.disabled
      const isSelected = values.includes(optionValue)

      const props = {
        ...option.props,
        selected: isSelected,
        isFocused: isFocused,
        disabled: typeof disabled === 'undefined' ? false : disabled !== false
      }

      if (option.component) {
        option.component.selected = isSelected
        option.component.isFocused = isFocused
      }

      return {
        ...option,
        props
      }
    },

    validateOption ({ children, el, props }) {
      const value = props.value
      const label = props.label || ''
      const textContent = (el && el.textContent) || ((children && children.default()) || []).reduce((str, node) => {
        const nodeText = node.elm ? node.elm.textContent : (node.text || node.children)
        return `${str} ${nodeText}`
      }, '') || ''
      const stringValues = this.filterByLabel ? [label].toString() : [value, label, textContent].toString()
      const query = this.query.toLowerCase().trim()
      return stringValues.toLowerCase().includes(query)
    },

    toggleMenu (e, force) {
      if (this.itemDisabled) {
        return false
      }

      this.visible = typeof force !== 'undefined' ? force : !this.visible
      if (this.visible) {
        this.dropDownWidth = this.$el.getBoundingClientRect().width
        this.broadcast('SelectDropdown', 'on-update-popper')
      }
    },
    hideMenu () {
      this.toggleMenu(null, false)
      // fix #728
      this.isTyping = false
      setTimeout(() => this.unchangedQuery = true, ANIMATION_TIMEOUT)
    },
    onClickOutside (event) {
      if (this.visible) {
        if (event.type === 'mousedown') {
          event.preventDefault()
          return
        }

        if (this.transfer) {
          const { $el } = this.$refs.dropdown
          if ($el === event.target || $el.contains(event.target)) {
            return
          }
        }

        if (this.filterable) {
          const input = this.$el.querySelector('input[type="text"]')
          this.caretPosition = input.selectionStart
          this.$nextTick(() => {
            const caretPosition = this.caretPosition === -1 ? input.value.length : this.caretPosition
            input.setSelectionRange(caretPosition, caretPosition)
          })
        }

        if (!this.autoComplete) event.stopPropagation()
        event.preventDefault()
        this.hideMenu()
        this.isFocused = true
        this.$emit('on-clickoutside', event)
      } else {
        this.caretPosition = -1
        this.isFocused = false
      }
    },
    reset () {
      this.query = ''
      this.focusIndex = -1
      this.unchangedQuery = true
      this.values = []
      this.filterQueryChange = false
    },
    handleKeydown (e) {
      const key = e.key || e.code
      const keyCode = e.keyCode || e.which
      if (key === 'Backspace' || keyCode === 8) {
        return
      }

      if (this.visible) {
        e.preventDefault()
        if (key === 'Tab') {
          e.stopPropagation()
        }

        if (key === 'Escape') {
          e.stopPropagation()
          this.hideMenu()
        }
        if (key === 'ArrowUp') {
          this.navigateOptions(-1)
        }
        if (key === 'ArrowDown') {
          this.navigateOptions(1)
        }
        if (key === 'Enter') {
          if (this.focusIndex === -1) return this.hideMenu()
          const optionComponent = this.flatOptions[this.focusIndex]

          if (optionComponent) {
            const option = this.getOptionData(optionComponent.props.value)
            this.onOptionClick(option)
          } else {
            this.hideMenu()
          }
        }
      } else {
        const keysThatCanOpenSelect = ['ArrowUp', 'ArrowDown']
        if (keysThatCanOpenSelect.includes(e.key)) this.toggleMenu(null, true)
      }
    },
    navigateOptions (direction) {
      const optionsLength = this.flatOptions.length - 1

      let index = this.focusIndex + direction
      if (index < 0) index = optionsLength
      if (index > optionsLength) index = 0

      if (direction > 0) {
        let nearestActiveOption = -1
        for (let i = 0; i < this.flatOptions.length; i++) {
          const optionIsActive = !this.flatOptions[i].props.disabled
          if (optionIsActive) nearestActiveOption = i
          if (nearestActiveOption >= index) break
        }
        index = nearestActiveOption
      } else {
        let nearestActiveOption = this.flatOptions.length
        for (let i = optionsLength; i >= 0; i--) {
          const optionIsActive = !this.flatOptions[i].props.disabled
          if (optionIsActive) nearestActiveOption = i
          if (nearestActiveOption <= index) break
        }
        index = nearestActiveOption
      }

      this.focusIndex = index
    },
    onOptionClick (option) {
      if (this.multiple) {
        if (this.remote) this.lastRemoteQuery = this.lastRemoteQuery || this.query
        else this.lastRemoteQuery = ''

        const valueIsSelected = this.values.find(({ value }) => value == option.value)
        if (valueIsSelected) {
          this.values = this.values.filter(({ value }) => value !== option.value)
        } else {
          this.values = this.values.concat(option)
        }

        this.isFocused = true
      } else {
        this.query = String(option.label).trim()
        this.values = [option]
        this.lastRemoteQuery = ''
        this.hideMenu()
      }

      this.focusIndex = this.flatOptions.findIndex((opt) => {
        if (!opt || !opt.props) return false

        return opt.props.value == option.value
      })

      if (this.filterable) {
        const inputField = this.$el.querySelector('input[type="text"]')
        if (!this.autoComplete) this.$nextTick(() => inputField.focus())
      }
      this.$emit('on-select', option)
      this.broadcast('SelectDropdown', 'on-update-popper')
      setTimeout(() => {
        this.filterQueryChange = false
      }, ANIMATION_TIMEOUT)
    },
    onQueryChange (query) {
      this.isTyping = true
      if (query.length > 0 && query !== this.query) {
        if (this.autoComplete) {
          const isInputFocused =
                            document.hasFocus &&
                            document.hasFocus() &&
                            document.activeElement === this.$el.querySelector('input')
          this.visible = isInputFocused
        } else {
          this.visible = true
        }
      }

      this.query = query
      this.unchangedQuery = this.visible
      this.filterQueryChange = true
    },
    toggleHeaderFocus ({ type }) {
      if (this.itemDisabled) {
        return
      }
      this.isFocused = type === 'focus'
    },
    updateSlotOptions () {
      if (this.$slots.default && this.$slots.default()[0].children) {
        this.slotOptions = this.$slots.default()[0].children
      }
    },
    checkUpdateStatus () {
      if (this.getInitialValue().length > 0 && this.selectOptions.length === 0) {
        this.hasExpectedValue = true
      }
    },
    handleCreateItem () {
      if (this.allowCreate && this.query !== '' && this.showCreateItem) {
        const query = this.query
        this.$emit('on-create', query)
        this.query = ''

        const option = {
          value: query,
          label: query,
          tag: undefined
        }
        if (this.multiple) {
          this.onOptionClick(option)
        } else {
          this.$nextTick(() => this.onOptionClick(option))
        }
      }
    }
  }
}
</script>
