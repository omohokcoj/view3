<template>
  <div>
    <Page
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      show-sizer
      show-elevator
      show-total
      :current.sync="current"
    />
    {{ current }}
    <VButton
      type="primary"
      @click="subject"
    >
      - 1
    </VButton>
    <VButton
      type="primary"
      @click="change"
    >
      Change
    </VButton>
    <Page
      :current="2"
      :total="50"
      simple
    />

    <div style="margin:10px 0px">
      <Page
        :total="1000"
        show-sizer
        show-elevator
        show-total
        :current="12"
      />
    </div>
    <div style="margin:10px 0px">
      <Page
        disabled
        :total="1000"
        show-sizer
        show-elevator
        show-total
        :current="12"
      />
      <Page
        :current="2"
        :total="50"
        simple
        disabled
      />
    </div>
    <div style="margin:100px 0px">
      <Page
        :total="500"
        show-sizer
        show-elevator
        show-total
      />
    </div>
    <div style="margin:100px 0px">
      <Page
        :total="500"
        show-sizer
        show-elevator
      />
    </div>
    <div style="margin:100px 0px">
      <Page
        :total="500"
        show-sizer
        show-elevator
      />
    </div>
    <div style="margin:10px 0px">
      <Page
        :total="500"
        show-sizer
      />
    </div>
    <div style="margin: 10px 0px">
      <Page
        :total="40"
        size="small"
      />
      <br><br>
      <Page
        :total="40"
        size="small"
        show-elevator
        show-sizer
      />
      <br><br>
      <Page
        :total="40"
        size="small"
        show-total
      />
      <br><br>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: 1,
      total: 21
    }
  },
  methods: {
    subject () {
      this.total -= 1
    },
    change () {
      this.current = 1
    }
  }
}
</script>
