<template>
  <div
    v-if="showSizer || showElevator"
    :class="optsClasses"
  >
    <div
      v-if="showSizer"
      :class="sizerClasses"
    >
      <VSelect
        v-model="currentPageSize"
        :size="size"
        :placement="placement"
        :transfer="transfer"
        :disabled="disabled"
        @on-change="changeSize"
      >
        <VOption
          v-for="item in pageSizeOpts"
          :key="item"
          :value="item"
          style="text-align:center;"
        >
          {{ item }}{{ t('i.page.page') }}
        </VOption>
      </VSelect>
    </div>
    <div
      v-if="showElevator"
      :class="ElevatorClasses"
    >
      {{ t('i.page.goto') }}
      <input
        type="text"
        :value="_current"
        autocomplete="off"
        spellcheck="false"
        :disabled="disabled"
        @keyup.enter="changePage"
      >
      {{ t('i.page.p') }}
    </div>
  </div>
</template>
<script>
import Locale from '../mixins/locale'
import VSelect from './select'
import VOption from './option'

const prefixCls = 'ivu-page'

function isValueNumber (value) {
  return (/^[1-9][0-9]*$/).test(value + '')
}

export default {
  name: 'PageOption',
  components: { VSelect, VOption },
  mixins: [Locale],
  props: {
    pageSizeOpts: Array,
    showSizer: Boolean,
    showElevator: Boolean,
    current: Number,
    _current: Number,
    pageSize: Number,
    allPages: Number,
    isSmall: Boolean,
    placement: String,
    transfer: Boolean,
    disabled: Boolean
  },
  emits: ['on-size'],
  data () {
    return {
      currentPageSize: this.pageSize
    }
  },
  computed: {
    size () {
      return this.isSmall ? 'small' : 'default'
    },
    optsClasses () {
      return [
                    `${prefixCls}-options`
      ]
    },
    sizerClasses () {
      return [
                    `${prefixCls}-options-sizer`
      ]
    },
    ElevatorClasses () {
      return [
                    `${prefixCls}-options-elevator`
      ]
    }
  },
  watch: {
    pageSize (val) {
      this.currentPageSize = val
    }
  },
  methods: {
    changeSize () {
      this.$emit('on-size', this.currentPageSize)
    },
    changePage (event) {
      let val = event.target.value.trim()
      let page = 0

      if (isValueNumber(val)) {
        val = Number(val)
        if (val != this.current) {
          const allPages = this.allPages

          if (val > allPages) {
            page = allPages
          } else {
            page = val
          }
        }
      } else {
        page = 1
      }

      if (page) {
        this.$emit('on-page', page)
        event.target.value = page
      }
    }
  }
}
</script>
