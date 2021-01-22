<template>
  <div class="layout-demo-con">
    <VButton @click="change">
      修改Sider绑定的变量来控制收缩
    </VButton>
    <Layout :style="{ minHeight: '100vh' }">
      <Sider
        ref="side"
        v-model="isCollapsed"
        collapsed-width="0"
        hide-trigger
        breakpoint="sm"
        collapsible
        width="200"
        @on-collapse="changed"
      >
        <Menu
          width="auto"
          theme="dark"
          active-name="1"
        >
          <MenuGroup title="内容管理">
            <MenuItem name="1">
              <Icon type="document-text" />
              文章管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="chatbubbles" />
              评论管理
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="统计分析">
            <MenuItem name="3">
              <Icon type="heart" />
              用户留存
            </MenuItem>
            <MenuItem name="4">
              <Icon type="heart-broken" />
              流失用户
            </MenuItem>
          </MenuGroup>
        </Menu>
        <!-- <div slot="trigger"><Icon type="document-text"></Icon></div> -->
      </Sider>
      <Layout class-name="test-class">
        <Header :style="{background: '#eee'}">
          <VButton @click="toggleCollapse">
            菜单
          </VButton>
        </Header>
        <Content :style="{background:'#FFCF9E'}">
          <p
            v-for="i in 100"
            :key="i"
          >
            {{ i }}
          </p>
        </Content>
        <Footer>sdfsdsdfsdfs</Footer>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapsed: false
    }
  },
  watch: {
    isCollapsed (val) {
      // console.log(val)
    }
  },
  methods: {
    toggleCollapse () {
      this.$refs.side.toggleCollapse()
    },
    change () {
      this.isCollapsed = !this.isCollapsed
    },
    changed (res) {
      console.log(res)
    }
  }
}
</script>
<style lang="scss" scoped>
    .layout-demo-con{
        height: 100%;
    }
</style>
