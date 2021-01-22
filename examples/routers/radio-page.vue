<template>
  <div>
    <Radio
      v-model="single"
      size="large"
    >
      Radio
    </Radio>
    <Radio
      v-model="single"
      size="default"
    >
      Radio
    </Radio>
    <Radio
      v-model="single"
      size="small"
    >
      Radio
    </Radio>
    <br>
    <Radio
      v-model="single"
      size="large"
      border
    >
      Radio
    </Radio>
    <Radio
      v-model="single"
      size="default"
      border
      disabled
    >
      Radio
    </Radio>
    <Radio
      v-model="single"
      size="small"
      border
    >
      Radio
    </Radio>
    <br><br>
    <Radio-group v-model="phone">
      <Radio label="apple">
        <Icon type="logo-apple" />
        <span>Apple</span>
      </Radio>
      <Radio label="android">
        <Icon type="social-android" />
        <span>Android</span>
      </Radio>
      <Radio label="windows">
        <Icon type="social-windows" />
        <span>Windows</span>
      </Radio>
    </Radio-group>
    <Radio-group
      v-model="button2"
      type="button"
      size="large"
      button-style="solid"
    >
      <Radio label="北京" />
      <Radio
        label="上海"
        disabled
      />
      <Radio label="深圳" />
      <Radio label="杭州" />
    </Radio-group>
    <Radio-group
      v-model="button2"
      type="button"
      size="large"
    >
      <Radio label="北京" />
      <Radio label="上海" />
      <Radio label="深圳" />
      <Radio label="杭州" />
    </Radio-group>
    <Radio-group
      v-model="button2"
      type="button"
      size="default"
    >
      <Radio label="北京" />
      <Radio
        label="上海"
        disabled
      />
      <Radio label="深圳" />
      <Radio label="杭州" />
    </Radio-group>
    <Radio-group
      v-model="button2"
      type="button"
      size="small"
    >
      <Radio label="北京" />
      <Radio
        label="上海"
        disabled
      />
      <Radio label="深圳" />
      <Radio label="杭州" />
    </Radio-group>
    <Divider />
    <Radio-group
      v-model="phone"
      size="small"
    >
      <Radio
        label="apple"
        border
      >
        <Icon type="logo-apple" />
        <span>选项一</span>
      </Radio>
      <Radio
        label="android"
        border
      >
        <Icon type="logo-android" />
        <span>选项二</span>
      </Radio>
      <Radio
        label="windows"
        border
      >
        <Icon type="logo-windows" />
        <span>选项三</span>
      </Radio>
    </Radio-group>
    <br><br>
    <Radio-group
      v-model="phone"
      size="default"
    >
      <Radio
        label="apple"
        border
      >
        <span>选项一</span>
      </Radio>
      <Radio
        label="android"
        border
        disabled
      >
        <span>选项二</span>
      </Radio>
      <Radio
        label="windows"
        border
      >
        <span>选项三</span>
      </Radio>
    </Radio-group>
    <br><br>
    <RadioGroup
      v-model="phone"
      size="large"
    >
      <Radio
        label="apple"
        border
      >
        <Icon type="logo-apple" />
        <span>选项一</span>
      </Radio>
      <Radio
        label="android"
        border
      >
        <Icon type="logo-android" />
        <span>选项二</span>
      </Radio>
      <Radio
        label="windows"
        border
      >
        <Icon type="logo-windows" />
        <span>选项三</span>
      </Radio>
    </RadioGroup>
  </div>
</template>
<script>
export default {
  name: 'VRadio',
  data () {
    return {
      single: true,
      phone: '',
      button2: '北京'
    }
  },
  methods: {

  }
}
</script>
