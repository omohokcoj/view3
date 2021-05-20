<template>
  <ul
    v-if="simple"
    :class="simpleWrapClasses"
    :style="styles"
  >
    <li
      :title="t('i.page.prev')"
      :class="prevClasses"
      @click="prev"
    >
      <a><i class="ion ion--ios-arrow-back" /></a>
    </li>
    <div
      :class="simplePagerClasses"
      :title="currentPage + '/' + allPages"
    >
      <input
        type="text"
        :value="currentPage"
        autocomplete="off"
        spellcheck="false"
        :disabled="disabled"
        @keydown="keyDown"
        @keyup="keyUp"
        @change="keyUp"
      >
      <span>/</span>
      {{ allPages }}
    </div>
    <li
      :title="t('i.page.next')"
      :class="nextClasses"
      @click="next"
    >
      <a><i class="ion ion-ios-arrow-forward" /></a>
    </li>
  </ul>
  <ul
    v-else
    :class="wrapClasses"
    :style="styles"
  >
    <span
      v-if="showTotal"
      :class="[prefixCls + '-total']"
    >
      <slot>{{ total }} <template v-if="total <= 1">{{ t('i.page.item') }}</template><template v-else>{{ t('i.page.items') }}</template></slot>
    </span>
    <li
      :title="t('i.page.prev')"
      :class="prevClasses"
      @click="prev"
    >
      <a><template v-if="prevText !== ''">{{ prevText }}</template><i
        v-else
        class="ion ion-ios-arrow-back"
      /></a>
    </li>
    <li
      title="1"
      :class="firstPageClasses"
      @click="changePage(1)"
    >
      <a>1</a>
    </li>
    <li
      v-if="currentPage > 5"
      :title="t('i.page.prev5')"
      :class="[prefixCls + '-item-jump-prev']"
      @click="fastPrev"
    >
      <a><i class="ion ion-ios-arrow-back" /><i class="ion ion-ios-more" /></a>
    </li>
    <li
      v-if="currentPage === 5"
      :title="currentPage - 3"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 3)"
    >
      <a>{{ currentPage - 3 }}</a>
    </li>
    <li
      v-if="currentPage - 2 > 1"
      :title="currentPage - 2"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 2)"
    >
      <a>{{ currentPage - 2 }}</a>
    </li>
    <li
      v-if="currentPage - 1 > 1"
      :title="currentPage - 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 1)"
    >
      <a>{{ currentPage - 1 }}</a>
    </li>
    <li
      v-if="currentPage != 1 && currentPage != allPages"
      :title="currentPage"
      :class="[prefixCls + '-item',prefixCls + '-item-active']"
    >
      <a>{{ currentPage }}</a>
    </li>
    <li
      v-if="currentPage + 1 < allPages"
      :title="currentPage + 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 1)"
    >
      <a>{{ currentPage + 1 }}</a>
    </li>
    <li
      v-if="currentPage + 2 < allPages"
      :title="currentPage + 2"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 2)"
    >
      <a>{{ currentPage + 2 }}</a>
    </li>
    <li
      v-if="allPages - currentPage === 4"
      :title="currentPage + 3"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 3)"
    >
      <a>{{ currentPage + 3 }}</a>
    </li>
    <li
      v-if="allPages - currentPage >= 5"
      :title="t('i.page.next5')"
      :class="[prefixCls + '-item-jump-next']"
      @click="fastNext"
    >
      <a><i class="ion ion-ios-arrow-forward" /><i class="ion ion-ios-more" /></a>
    </li>
    <li
      v-if="allPages > 1"
      :title="allPages"
      :class="lastPageClasses"
      @click="changePage(allPages)"
    >
      <a>{{ allPages }}</a>
    </li>
    <li
      :title="t('i.page.next')"
      :class="nextClasses"
      @click="next"
    >
      <a><template v-if="nextText !== ''">{{ nextText }}</template><i
        v-else
        class="ion ion-ios-arrow-forward"
      /></a>
    </li>
    <PageOptions
      :show-sizer="showSizer"
      :page-size="currentPageSize"
      :page-size-opts="pageSizeOpts"
      :placement="placement"
      :transfer="transfer"
      :show-elevator="showElevator"
      :_current.once="currentPage"
      :current="currentPage"
      :disabled="disabled"
      :all-pages="allPages"
      :is-small="isSmall"
      @on-size="onSize"
      @on-page="onPage"
    />
  </ul>
</template>
<script>
import { oneOf } from '../utils/assist'
import PageOptions from './page-options'
import Locale from '../mixins/locale'

const prefixCls = 'ivu-page'

export default {
  name: 'Page',
  components: { PageOptions },
  mixins: [Locale],
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default () {
        return [10, 20, 30, 40]
      }
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'bottom'])
      },
      default: 'bottom'
    },
    transfer: {
      type: Boolean,
      default () {
        return false
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['small'])
      }
    },
    simple: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    },
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:current', 'on-change'],
  data () {
    return {
      prefixCls: prefixCls,
      currentPage: this.current,
      currentPageSize: this.pageSize
    }
  },
  computed: {
    isSmall () {
      return !!this.size
    },
    allPages () {
      const allPage = Math.ceil(this.total / this.currentPageSize)
      return (allPage === 0) ? 1 : allPage
    },
    simpleWrapClasses () {
      return [
                    `${prefixCls}`,
                    `${prefixCls}-simple`,
                    {
                      [`${this.className}`]: !!this.className
                    }
      ]
    },
    simplePagerClasses () {
      return `${prefixCls}-simple-pager`
    },
    wrapClasses () {
      return [
                    `${prefixCls}`,
                    {
                      [`${this.className}`]: !!this.className,
                      [`${prefixCls}-with-disabled`]: this.disabled,
                      mini: !!this.size
                    }
      ]
    },
    prevClasses () {
      return [
                    `${prefixCls}-prev`,
                    {
                      [`${prefixCls}-disabled`]: this.currentPage === 1 || this.disabled,
                      [`${prefixCls}-custom-text`]: this.prevText !== ''
                    }
      ]
    },
    nextClasses () {
      return [
                    `${prefixCls}-next`,
                    {
                      [`${prefixCls}-disabled`]: this.currentPage === this.allPages || this.disabled,
                      [`${prefixCls}-custom-text`]: this.nextText !== ''
                    }
      ]
    },
    firstPageClasses () {
      return [
                    `${prefixCls}-item`,
                    {
                      [`${prefixCls}-item-active`]: this.currentPage === 1
                    }
      ]
    },
    lastPageClasses () {
      return [
                    `${prefixCls}-item`,
                    {
                      [`${prefixCls}-item-active`]: this.currentPage === this.allPages
                    }
      ]
    }
  },
  watch: {
    total (val) {
      const maxPage = Math.ceil(val / this.currentPageSize)
      if (maxPage < this.currentPage) {
        this.currentPage = (maxPage === 0 ? 1 : maxPage)
      }
    },
    current (val) {
      this.currentPage = val
    },
    pageSize (val) {
      this.currentPageSize = val
    }
  },
  methods: {
    changePage (page) {
      if (this.disabled) return
      if (this.currentPage != page) {
        this.currentPage = page
        this.$emit('update:current', page)
        this.$emit('on-change', page)
      }
    },
    prev () {
      if (this.disabled) return
      const current = this.currentPage
      if (current <= 1) {
        return false
      }
      this.changePage(current - 1)
    },
    next () {
      if (this.disabled) return
      const current = this.currentPage
      if (current >= this.allPages) {
        return false
      }
      this.changePage(current + 1)
    },
    fastPrev () {
      if (this.disabled) return
      const page = this.currentPage - 5
      if (page > 0) {
        this.changePage(page)
      } else {
        this.changePage(1)
      }
    },
    fastNext () {
      if (this.disabled) return
      const page = this.currentPage + 5
      if (page > this.allPages) {
        this.changePage(this.allPages)
      } else {
        this.changePage(page)
      }
    },
    onSize (pageSize) {
      if (this.disabled) return

      if (this.currentPageSize != pageSize) {
        this.currentPageSize = pageSize
        this.$emit('update:page-size', pageSize)
        this.$emit('on-page-size-change', pageSize)
        this.changePage(1)
      }
    },
    onPage (page) {
      if (this.disabled) return
      this.changePage(page)
    },
    keyDown (e) {
      const key = e.keyCode
      const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39

      if (!condition) {
        e.preventDefault()
      }
    },
    keyUp (e) {
      const key = e.keyCode
      const val = parseInt(e.target.value)

      if (key === 38) {
        this.prev()
      } else if (key === 40) {
        this.next()
      } else if (key === 13) {
        let page = 1

        if (val > this.allPages) {
          page = this.allPages
        } else if (val <= 0 || !val) {
          page = 1
        } else {
          page = val
        }

        e.target.value = page
        this.changePage(page)
      }
    }
  }
}
</script>
