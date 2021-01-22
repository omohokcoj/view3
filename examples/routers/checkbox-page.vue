<template>
  <div>
    <!-- <Checkbox -->
    <!--   :indeterminate="true" -->
    <!--   :model&#45;value="false" -->
    <!--   size="large" -->
    <!-- > -->
    <!--   全选 -->
    <!-- </Checkbox> -->
    <!-- <Checkbox -->
    <!--   :indeterminate="true" -->
    <!--   :model&#45;value="false" -->
    <!--   size="default" -->
    <!-- > -->
    <!--   全选 -->
    <!-- </Checkbox> -->
    <!-- <Checkbox -->
    <!--   :indeterminate="true" -->
    <!--   :model&#45;value="false" -->
    <!--   size="small" -->
    <!-- > -->
    <!--   全选 -->
    <!-- </Checkbox> -->
    <!-- <div> -->
    <!--   <Checkbox -->
    <!--     v&#45;model="testValue1" -->
    <!--     size="large" -->
    <!--     true&#45;value="true" -->
    <!--     false&#45;value="false" -->
    <!--   > -->
    <!--     Apple -->
    <!--   </Checkbox> -->
    <!--   <Checkbox -->
    <!--     v&#45;model="testValue1" -->
    <!--     true&#45;value="true" -->
    <!--     false&#45;value="false" -->
    <!--     disabled -->
    <!--   > -->
    <!--     Apple -->
    <!--   </Checkbox> -->
    <!--   <Checkbox -->
    <!--     v&#45;model="testValue1" -->
    <!--     size="small" -->
    <!--     true&#45;value="true" -->
    <!--     false&#45;value="false" -->
    <!--   > -->
    <!--     Apple -->
    <!--   </Checkbox> -->
    <!--   {{ testValue1 }} -->
    <!-- </div> -->
    <!-- <div> -->
    <!--   <Checkbox -->
    <!--     v&#45;model="testValue2" -->
    <!--     :true&#45;value="0" -->
    <!--     :false&#45;value="1" -->
    <!--   > -->
    <!--     test number -->
    <!--   </Checkbox> -->
    <!--   {{ testValue2 }} -->
    <!-- </div> -->
    <CheckboxGroup
      v-model="fruit"
      size="large"
    >
      <Checkbox
        v-for="item in tags"
        :key="item.label"
        :label="item.label"
        true-value="true"
      />
    </CheckboxGroup>
    <div>{{ fruit }}</div>
    <Divider />
    <CheckboxGroup
      v-model="fruit"
      size="small"
    >
      <Checkbox label="香蕉" />
      <Checkbox label="苹果" />
      <Checkbox label="西瓜" />
    </CheckboxGroup>
    <br>
    <CheckboxGroup
      v-model="fruit"
      size="default"
    >
      <Checkbox label="香蕉" />
      <Checkbox label="苹果" />
      <Checkbox label="西瓜" />
    </CheckboxGroup>
    <br>
    <CheckboxGroup
      v-model="fruit"
      size="large"
    >
      <Checkbox label="香蕉" />
      <Checkbox label="苹果" />
      <Checkbox label="西瓜" />
    </CheckboxGroup>
    <Divider />
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <Checkbox
        :indeterminate="indeterminate"
        :model-value="false"
        @click.prevent.native="handleCheckAll"
      >
        全选
      </Checkbox>
    </div>
    <CheckboxGroup
      v-model="checkAllGroup"
      @on-change="checkAllGroupChange"
    >
      <Checkbox label="香蕉" />
      <Checkbox label="苹果" />
      <Checkbox label="西瓜" />
    </CheckboxGroup>
    <Divider />
    <CheckboxGroup
      v-model="fruit"
      size="small"
    >
      <Checkbox
        label="香蕉"
        border
      />
      <Checkbox
        label="苹果"
        border
      />
      <Checkbox
        label="西瓜"
        border
      />
    </CheckboxGroup>
    <br>
    <CheckboxGroup
      v-model="fruit"
      size="default"
    >
      <Checkbox
        label="香蕉"
        border
      />
      <Checkbox
        label="苹果"
        border
        disabled
      />
      <Checkbox
        label="西瓜"
        border
      />
    </CheckboxGroup>
    <br>
    <CheckboxGroup
      v-model="fruit"
      size="large"
    >
      <Checkbox
        label="香蕉"
        border
      />
      <Checkbox
        label="苹果"
        border
      />
      <Checkbox
        label="西瓜"
        border
      />
    </CheckboxGroup>
    <Divider />
    <Checkbox
      v-model="single"
      size="small"
      border
    >
      单独
    </Checkbox>
    <Checkbox
      v-model="single"
      size="default"
      border
      disabled
    >
      单独
    </Checkbox>
    <Checkbox
      v-model="single"
      size="large"
      border
    >
      单独
    </Checkbox>
  </div>
</template>
<script>
export default {
  data () {
    return {
      social: ['facebook', 'github'],
      fruit: ['苹果'],
      tags: [],
      testValue1: null,
      testValue2: null,
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ['香蕉', '西瓜'],
      single: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.tags = [
        {
          label: '香蕉'
        },
        {
          label: '苹果'
        },
        {
          label: '西瓜'
        }
      ]
    }, 1000)
  },
  methods: {
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.checkAllGroup = ['香蕉', '苹果', '西瓜']
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 3) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    }
  }
}
</script>
