<template>
  <div>
    <Divider>vue-router 3.1 bug</Divider>
    <VButton to="/button">
      跳转到 Button（当前路径）
    </VButton>
    <VButton
      to="/button"
      replace
    >
      跳转到 Button（当前路径, replace）
    </VButton>
    <Divider />
    <VButton
      icon="logo-github"
      size="small"
      shape="circle"
    />
    <VButton
      icon="logo-github"
      shape="circle"
    />
    <VButton
      icon="logo-github"
      size="large"
      shape="circle"
    />

    <VButton
      icon="logo-github"
      size="small"
    />
    <VButton size="small">
      EN
    </VButton>

    <VButton icon="logo-github" />
    <VButton>EN</VButton>

    <VButton
      icon="logo-github"
      size="large"
    />
    <VButton size="large">
      EN
    </VButton>

    <ButtonGroup size="small">
      <VButton icon="logo-github" />
      <VButton icon="logo-twitter" />
      <VButton>
        EN
      </VButton>
    </ButtonGroup>

    <ButtonGroup>
      <VButton icon="logo-github" />
      <VButton icon="logo-twitter" />
      <VButton>
        ENs
      </VButton>
    </ButtonGroup>

    <ButtonGroup size="large">
      <VButton icon="logo-github" />
      <VButton icon="logo-twitter" />
      <VButton>
        EN
      </VButton>
    </ButtonGroup>
    <br><br><br>
    <VButton type="default">
      Default
    </VButton>
    <VButton type="primary">
      Primary
    </VButton>
    <VButton type="dashed">
      Dashed
    </VButton>
    <VButton type="info">
      Info
    </VButton>
    <VButton type="success">
      Success
    </VButton>
    <VButton type="warning">
      Warning
    </VButton>
    <VButton type="error">
      Error
    </VButton>
    <VButton type="text">
      Text
    </VButton>
    <br><br><br>
    <VButton
      type="default"
      disabled
    >
      Default
    </VButton>
    <VButton
      type="primary"
      disabled
    >
      Primary
    </VButton>
    <VButton
      type="dashed"
      disabled
    >
      Dashed
    </VButton>
    <VButton
      type="info"
      disabled
    >
      Info
    </VButton>
    <VButton
      type="success"
      disabled
    >
      Success
    </VButton>
    <VButton
      type="warning"
      disabled
    >
      Warning
    </VButton>
    <VButton
      type="error"
      disabled
    >
      Error
    </VButton>
    <VButton
      type="text"
      disabled
    >
      Text
    </VButton>
    <br><br><br>
    <div style="padding: 20px;background: rgb(190, 200, 200)">
      <VButton
        type="default"
        ghost
      >
        Default
      </VButton>
      <VButton
        type="primary"
        ghost
      >
        Primary
      </VButton>
      <VButton
        type="dashed"
        ghost
      >
        Dashed
      </VButton>
      <VButton
        type="info"
        ghost
      >
        Info
      </VButton>
      <VButton
        type="success"
        ghost
      >
        Success
      </VButton>
      <VButton
        type="warning"
        ghost
      >
        Warning
      </VButton>
      <VButton
        type="error"
        ghost
      >
        Error
      </VButton>
      <VButton
        type="text"
        ghost
      >
        Text
      </VButton>
      <br><br><br>
      <VButton
        type="default"
        ghost
        disabled
      >
        Default
      </VButton>
      <VButton
        type="primary"
        ghost
        disabled
      >
        Primary
      </VButton>
      <VButton
        type="dashed"
        ghost
        disabled
      >
        Dashed
      </VButton>
      <VButton
        type="info"
        ghost
        disabled
      >
        Info
      </VButton>
      <VButton
        type="success"
        ghost
        disabled
      >
        Success
      </VButton>
      <VButton
        type="warning"
        ghost
        disabled
      >
        Warning
      </VButton>
      <VButton
        type="error"
        ghost
        disabled
      >
        Error
      </VButton>
      <VButton
        type="text"
        ghost
        disabled
      >
        Text
      </VButton>
    </div>
    <Divider />
    <VButton type="primary">
      普通按钮
    </VButton>
    <VButton
      type="primary"
      to="/"
    >
      普通按钮
    </VButton>
    <VButton
      type="primary"
      size="small"
    >
      普通按钮
    </VButton>
    <VButton
      type="primary"
      to="/"
      size="small"
    >
      普通按钮
    </VButton>
    <VButton
      type="primary"
      size="large"
    >
      普通按钮
    </VButton>
    <VButton
      type="primary"
      to="/"
      size="large"
    >
      普通按钮
    </VButton>
    <VButton
      type="primary"
      size="large"
      shape="circle"
    >
      普通按钮
    </VButton>
    <VButton
      type="primary"
      to="/"
      size="large"
      shape="circle"
    >
      普通按钮
    </VButton>
    <br><br><br>
    <VButton
      type="primary"
      icon="ios-information-circle"
      size="small"
    >
      Search
    </VButton>
    <VButton
      type="primary"
      icon="ios-information-circle"
      size="default"
    >
      Search
    </VButton>
    <VButton
      type="primary"
      icon="ios-information-circle"
      size="large"
    >
      Search
    </VButton>
    <br><br><br>
    <VButton @click="hc">
      Open Menu2
    </VButton>
    <VButton
      to="/menu"
      @click="hc"
    >
      Open Menu2
    </VButton>
    <VButton
      to="/menu"
      replace
    >
      Open Menu Replace
    </VButton>
    <VButton
      to="//iviewui.com"
      target="_blank"
    >
      Open iView
    </VButton>
    <hr>
    <VButton @click="hc">
      链接按钮
    </VButton>
    <VButton
      to="/menu"
      @click="hc"
    >
      链接按钮
    </VButton>
    <hr>
    <Icon custom="i-icon i-icon-search" />
    <Icon
      custom="i-icon i-icon-video"
      size="24"
      color="#ff6600"
    />
    <Icon custom="i-icon i-icon-time" />
    <Icon type="ionic" />
    <VButton icon="ionic">
      Default
    </VButton>
    <VButton custom-icon="i-icon i-icon-search">
      Default
    </VButton>
    <VButton
      icon="ionic"
      shape="circle"
    />
    <VButton
      custom-icon="i-icon i-icon-video"
      shape="circle"
    />
    <hr>
    <VButton>Default</VButton>
    <VButton type="primary">
      Primary
    </VButton>
    <VButton type="default">
      Ghost
    </VButton>
    <VButton type="dashed">
      Dashed
    </VButton>
    <VButton type="text">
      Text
    </VButton>
    <br><br>
    <VButton type="info">
      Info
    </VButton>
    <VButton type="success">
      Success
    </VButton>
    <VButton type="warning">
      Warning
    </VButton>
    <VButton type="error">
      Error
    </VButton>
    <br><br>
    <VButton
      type="primary"
      shape="circle"
      icon="ios-search"
    />
    <VButton
      type="primary"
      icon="ios-search"
    >
      Search
    </VButton>
    <VButton
      type="primary"
      shape="circle"
      icon="ios-search"
    >
      Search
    </VButton>
    <VButton
      type="primary"
      shape="circle"
    >
      Circle
    </VButton>
    <br><br>
    <VButton
      type="default"
      shape="circle"
      icon="ios-search"
    />
    <VButton
      type="default"
      icon="ios-search"
    >
      Search
    </VButton>
    <VButton
      type="default"
      shape="circle"
      icon="ios-search"
    >
      Search
    </VButton>
    <VButton
      type="default"
      shape="circle"
    >
      Circle
    </VButton>
    <br><br>
    <VButton>Default</VButton>
    <VButton disabled>
      Default(Disabled)
    </VButton>
    <br>
    <VButton type="primary">
      Primary
    </VButton>
    <VButton
      type="primary"
      disabled
    >
      Primary(Disabled)
    </VButton>
    <br>
    <VButton type="default">
      Ghost
    </VButton>
    <VButton
      type="default"
      disabled
    >
      Ghost(Disabled)
    </VButton>
    <br>
    <VButton type="dashed">
      Dashed
    </VButton>
    <VButton
      type="dashed"
      disabled
    >
      Dashed(Disabled)
    </VButton>
    <br>
    <VButton type="text">
      Text
    </VButton>
    <VButton
      type="text"
      disabled
    >
      Text(Disabled)
    </VButton>
    <br><br>

    <br><br>
    <h4>基本</h4>
    <br><br>
    <ButtonGroup>
      <VButton>取消</VButton>
      <VButton type="primary">
        确定
      </VButton>
    </ButtonGroup>
    <ButtonGroup>
      <VButton disabled>
        昨日
      </VButton>
      <VButton disabled>
        今日
      </VButton>
      <VButton disabled>
        明日
      </VButton>
    </ButtonGroup>
    <ButtonGroup>
      <VButton type="primary">
        L
      </VButton>
      <VButton>M</VButton>
      <VButton type="default">
        M
      </VButton>
      <VButton type="dashed">
        R
      </VButton>
    </ButtonGroup>
    <br><br>
    <h4>配合图标</h4>
    <br><br>
    <ButtonGroup>
      <VButton type="primary">
        <Icon type="chevron-left" />
        前进
      </VButton>
      <VButton type="primary">
        后退
        <Icon type="chevron-right" />
      </VButton>
    </ButtonGroup>
    <ButtonGroup>
      <VButton
        type="primary"
        icon="ios-skip-backward"
      />
      <VButton
        type="primary"
        icon="ios-skip-forward"
      />
    </ButtonGroup>
    <ButtonGroup>
      <VButton
        type="default"
        icon="ios-color-wand-outline"
      />
      <VButton
        type="default"
        icon="ios-sunny-outline"
      />
      <VButton
        type="default"
        icon="ios-crop"
      />
      <VButton
        type="default"
        icon="ios-color-filter-outline"
      />
    </ButtonGroup>
    <br><br>
    <h4>圆角</h4>
    <br><br>
    <ButtonGroup shape="circle">
      <VButton type="primary">
        <Icon type="chevron-left" />
        前进
      </VButton>
      <VButton type="primary">
        后退
        <Icon type="chevron-right" />
      </VButton>
    </ButtonGroup>
    <ButtonGroup shape="circle">
      <VButton
        type="primary"
        icon="ios-skip-backward"
      />
      <VButton
        type="primary"
        icon="ios-skip-forward"
      />
    </ButtonGroup>
    <ButtonGroup shape="circle">
      <VButton
        type="default"
        icon="ios-color-wand-outline"
      />
      <VButton
        type="default"
        icon="ios-sunny-outline"
      />
      <VButton
        type="default"
        icon="ios-crop"
      />
      <VButton
        type="default"
        icon="ios-color-filter-outline"
      />
    </ButtonGroup>
    <br><br>
    <h4>尺寸</h4>
    <br><br>
    <ButtonGroup size="large">
      <VButton type="default">
        Large
      </VButton>
      <VButton type="default">
        Large
      </VButton>
    </ButtonGroup>
    <ButtonGroup size="large">
      <VButton type="default">
        大汉字
      </VButton>
      <VButton type="default">
        大汉字
      </VButton>
    </ButtonGroup>
    <ButtonGroup>
      <VButton type="default">
        Default
      </VButton>
      <VButton type="default">
        Default
      </VButton>
    </ButtonGroup>
    <ButtonGroup size="small">
      <VButton type="default">
        Small
      </VButton>
      <VButton type="default">
        Small
      </VButton>
    </ButtonGroup>
    <br><br>
    <ButtonGroup
      size="large"
      shape="circle"
    >
      <VButton type="default">
        Large
      </VButton>
      <VButton type="default">
        Large
      </VButton>
    </ButtonGroup>
    <ButtonGroup shape="circle">
      <VButton type="default">
        Default
      </VButton>
      <VButton type="default">
        Default
      </VButton>
    </ButtonGroup>
    <ButtonGroup
      size="small"
      shape="circle"
    >
      <VButton type="default">
        Small
      </VButton>
      <VButton type="default">
        Small
      </VButton>
    </ButtonGroup>

    <br><br>
    <VButton to="/icon">
      Open New Window
    </VButton>
    <br><br><br>
    <ButtonGroup
      vertical
      size="small"
    >
      <VButton icon="logo-facebook" />
      <VButton icon="logo-twitter" />
      <VButton icon="logo-googleplus" />
      <VButton icon="logo-tumblr" />
    </ButtonGroup>
    <ButtonGroup vertical>
      <VButton icon="logo-facebook" />
      <VButton icon="logo-twitter" />
      <VButton icon="logo-googleplus" />
      <VButton icon="logo-tumblr" />
    </ButtonGroup>
    <ButtonGroup
      vertical
      size="large"
    >
      <VButton icon="logo-facebook" />
      <VButton icon="logo-twitter" />
      <VButton icon="logo-googleplus" />
      <VButton icon="logo-tumblr" />
    </ButtonGroup>
    <br><br>
    <VButton>
      <Icon type="md-alert" />
      左右图标
      <Icon type="ios-aperture" />
    </VButton>
    <VButton>
      左右图标
      <Icon type="ios-aperture" />
    </VButton>
    <VButton>
      <Icon type="md-alert" />
      左右图标
    </VButton>
    <VButton icon="md-alert">
      左右图标
    </VButton>
    <Divider />
    <div>
      <RadioGroup
        v-model="buttonSize"
        type="button"
      >
        <Radio label="large">
          Large
        </Radio>
        <Radio label="default">
          Default
        </Radio>
        <Radio label="small">
          small
        </Radio>
      </RadioGroup>
      <br><br>
      <VButton
        :size="buttonSize"
        type="primary"
      >
        Primary
      </VButton>
      <VButton
        :size="buttonSize"
        type="default"
      >
        Default
      </VButton>
      <VButton
        :size="buttonSize"
        type="dashed"
      >
        Dashed
      </VButton>
      <VButton
        :size="buttonSize"
        type="text"
      >
        Text
      </VButton>
      <br><br>
      <VButton
        :size="buttonSize"
        icon="md-download"
        type="primary"
        shape="circle"
      />
      <VButton
        :size="buttonSize"
        icon="md-download"
        type="primary"
      >
        Download
      </VButton>
      <br><br>
      <ButtonGroup :size="buttonSize">
        <VButton
          :size="buttonSize"
          type="primary"
        >
          <Icon type="ios-arrow-back" />
          Backward
        </VButton>
        <VButton
          :size="buttonSize"
          type="primary"
        >
          Forward
          <Icon type="ios-arrow-forward" />
        </VButton>
      </ButtonGroup>
    </div>
    <Divider />
    <VButton
      to="http://baidu.com"
      replace
    >
      http跳转
    </VButton>
    <VButton
      to="https://iviewui.com"
      replace
    >
      https跳转
    </VButton>
    <VButton :to="{path: '/icon'}">
      Router 对象跳转
    </VButton>
  </div>
</template>
<script>
export default {
  data () {
    return {
      buttonSize: 'large'
    }
  },
  methods: {
    hc (data) {
      console.log(data)
    }
  }
}
</script>
