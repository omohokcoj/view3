<template>
  <div
    class="ivu-poptip-popper ivu-poptip"
    :class="{ 'ivu-poptip-confirm': confirm }"
  >
    <div class="ivu-poptip-content">
      <div class="ivu-poptip-arrow" />
      <div class="ivu-poptip-inner">
        <div
          class="ivu-poptip-body"
          :style="bodyStyle"
        >
          <i
            v-if="confirm"
            class="ion ion-ios-help-circle"
          />
          <div
            v-if="title"
            class="ivu-poptip-body-message"
          >
            {{ title }}
          </div>
          <RenderCell
            v-if="render"
            :render="render"
          />
          <template
            v-if="content"
          >
            {{ content }}
          </template>
          <slot />
        </div>
        <div
          v-if="confirm"
          class="ivu-poptip-footer"
        >
          <button
            type="button"
            class="ivu-btn ivu-btn-text ivu-btn-small"
            @click.prevent="$emit('on-cancel')"
          >
            <span>Cancel</span>
          </button>
          <button
            type="button"
            class="ivu-btn ivu-btn-primary ivu-btn-small"
            @click.prevent="$emit('on-ok')"
          >
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RenderCell from './render-cell'

export default {
  name: 'Popover',
  components: {
    RenderCell
  },
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    confirm: {
      type: Boolean,
      required: false,
      default: false
    },
    bodyStyle: {
      type: [String, Object],
      required: false,
      default: ''
    },
    render: {
      type: Function,
      required: false,
      default: null
    }
  }
}
</script>
