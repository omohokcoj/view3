<template>
  <div>
    <Switch
      v-model="m1"
      :loading="loading"
      :before-change="beforeChange"
      @on-change="change"
    >
      <span slot="open">开</span>
      <span slot="close">关</span>
    </Switch>
    {{ m1 }}
    <div @click="m1 = !m1">
      toggle
    </div>
    <div @click="loading = !loading">
      loading
    </div>
    <br><br>
    <Switch
      size="large"
      loading
    />
    <Switch />
    <Switch
      v-model="m1"
      size="small"
      :loading="loading"
    />
    <br><br>
    <Switch>
      <span slot="open">开</span>
      <span slot="close">关</span>
    </Switch>
    <Switch>
      <Icon
        slot="open"
        type="md-checkmark"
      />
      <Icon
        slot="close"
        type="md-close"
      />
    </Switch>
    <br><br>
    <Switch size="large">
      <span slot="open">开启</span>
      <span slot="close">关闭</span>
    </Switch>
    <Switch
      v-model="m1"
      size="large"
      :loading="loading"
    >
      <span slot="open">ON</span>
      <span slot="close">OFF</span>
    </Switch>
    <br><br>
    <Switch :disabled="disabled" />
    <VButton
      type="primary"
      @click="disabled = !disabled"
    >
      Toggle Disabled
    </VButton>
    <Divider />
    <Switch
      v-model="switch1"
      true-color="#13ce66"
      false-color="#ff4949"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      m1: true,
      disabled: true,
      loading: false,
      switch1: true
    }
  },
  methods: {
    change (status) {
      console.log(status)
    },
    beforeChange () {
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: '切换确认',
          content: '您确认要切换开关状态吗？',
          onOk: () => {
            resolve()
          },
          onCancel: () => {
            reject()
          }
        })
      })
    }
  }
}
</script>
