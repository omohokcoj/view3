<template>
  <div>
    <Rate v-model="value" />
    <Rate
      v-model="valueHalf"
      allow-half
    />
    <Rate
      v-model="valueClear"
      clearable
    />
    <Rate
      v-model="valueClearHalf"
      clearable
      allow-half
    />
    <Rate
      v-model="characterValue"
      allow-half
      show-text
      character="好"
    />
    <Rate
      v-model="cv"
      allow-half
      icon="ios-heart"
    />
    <!--<Rate show-text v-model="valueText"></Rate>-->
    <!--<Rate show-text allow-half v-model="valueCustomText">-->
    <!--<span style="color: #f5a623">{{ valueCustomText }}</span>-->
    <!--</Rate>-->
    <!--<Rate disabled  allow-half v-model="valueDisabled"></Rate>-->
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 0,
      valueHalf: 2.5,
      valueText: 3,
      valueCustomText: 4.0,
      valueDisabled: 2.4,
      valueClear: 1,
      valueClearHalf: 1.5,
      characterValue: 2.5,
      cv: 3.5
    }
  }
}
</script>
