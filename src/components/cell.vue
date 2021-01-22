<template>
  <div :class="classes">
    <a
      v-if="to"
      :href="linkUrl"
      :target="target"
      class="ivu-cell-link"
      @click.exact="handleClickItem($event, false)"
      @click.ctrl="handleClickItem($event, true)"
      @click.meta="handleClickItem($event, true)"
    >
      <CellItem
        :title="title"
        :label="label"
        :extra="extra"
      >
        <slot
          slot="icon"
          name="icon"
        />
        <slot slot="default" />
        <slot
          slot="extra"
          name="extra"
        />
        <slot
          slot="label"
          name="label"
        />
      </CellItem>
    </a>
    <div
      v-else
      class="ivu-cell-link"
      @click="handleClickItem"
    >
      <CellItem
        :title="title"
        :label="label"
        :extra="extra"
      >
        <slot
          slot="icon"
          name="icon"
        />
        <slot slot="default" />
        <slot
          slot="extra"
          name="extra"
        />
        <slot
          slot="label"
          name="label"
        />
      </CellItem>
    </div>
    <div
      v-if="to"
      class="ivu-cell-arrow"
    >
      <slot name="arrow">
        <Icon
          :type="arrowType"
          :custom="customArrowType"
          :size="arrowSize"
        />
      </slot>
    </div>
  </div>
</template>
<script>
import CellItem from './cell-item.vue'
import Icon from './icon.vue'
import mixinsLink from '../mixins/link'

const prefixCls = 'ivu-cell'

export default {
  name: 'Cell',
  components: { CellItem, Icon },
  mixins: [mixinsLink],
  inject: ['cellGroup'],
  props: {
    name: {
      type: [String, Number]
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    extra: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-disabled`]: this.disabled,
                      [`${prefixCls}-selected`]: this.selected,
                      [`${prefixCls}-with-link`]: this.to
                    }
      ]
    },
    // 3.4.0, global setting customArrow 有值时，arrow 赋值空
    arrowType () {
      return 'ios-arrow-forward'
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
  methods: {
    handleClickItem (event, new_window) {
      this.$parent.handleClick(this.name)

      this.handleCheckClick(event, new_window)
    }
  }
}
</script>
