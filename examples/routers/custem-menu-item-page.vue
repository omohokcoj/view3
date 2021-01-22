<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <span>{{ parentItem.name }}</span>
    </template>
    <template v-for="item in children">
      <custem-menu-item
        v-if="item.children && item.children.length !== 0"
        :key="`menu-${item.name}`"
        :parent-item="item"
      />
      <menu-item
        v-else
        :key="`menu-${item.name}`"
        :name="`${item.name}`"
      >
        {{ item.name }}
      </menu-item>
    </template>
  </Submenu>
</template>
<script>
export default {
  name: 'CustemMenuItem',
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    parentName () {
      return this.parentItem.name
    },
    children () {
      return this.parentItem.children
    }
  }
}
</script>
