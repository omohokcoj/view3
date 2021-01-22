<template>
  <div style="height: 300px;">
    <Progress
      vertical
      :percent="25"
    />
    <Progress
      vertical
      :percent="45"
      status="active"
    />
    <Progress
      vertical
      :percent="65"
      status="wrong"
    />
    <Progress
      vertical
      :percent="100"
    />
    <Progress
      vertical
      :percent="25"
      hide-info
    />

    <Progress :percent="25" />
    <Progress
      :percent="45"
      status="active"
    />
    <Progress
      :percent="65"
      status="wrong"
    />
    <Progress :percent="100" />
    <Progress
      :percent="25"
      hide-info
    />

    <Divider />

    <Progress
      :percent="10"
      :stroke-width="20"
      text-inside
    />

    <Divider />

    <Progress
      :percent="90"
      :stroke-color="color1"
    />
    <Progress
      :percent="90"
      :stroke-color="color2"
      status="active"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      color1: '#ff6600',
      color2: ['#108ee9', '#87d068']
    }
  }
}
</script>
