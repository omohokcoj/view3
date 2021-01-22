<template>
  <div>
    <!-- <DatePicker -->
    <!--   v&#45;model="updatedate" -->
    <!--   :capture="false" -->
    <!--   size="small" -->
    <!--   type="datetimerange" -->
    <!--   placement="bottom&#45;end" -->
    <!--   placeholder="请输入变更时间" -->
    <!--   style="width: 150px" -->
    <!-- /> -->
    <Dropdown
      trigger="click"
      transfer
      @on-click="aaaa(111)"
    >
      <VButton
        size="small"
        type="primary"
      >
        更多
        <Icon type="md-arrow-dropdown" />
      </VButton>
      <template v-slot:list>
        <DropdownMenu>
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>
    <Cascader
      v-model="value1"
      :data="data"
      transfer
      style="width: 200px"
    />
    <VSelect
      v-model="model1"
      multiple
      transfer
      style="width:200px"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>
    <Poptip
      trigger="click"
      transfer
      title="Title"
      content="content"
    >
      <VButton>Hover</VButton>
    </Poptip>
    <!-- <ColorPicker -->
    <!--   v&#45;model="color1" -->
    <!--   transfer -->
    <!-- /> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      updatedate: null,
      color1: '#19be6b',
      value1: [],
      data: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: []
    }
  },
  mounted () {

  },
  methods: {
    aaaa () {
      // this.$Message.info('aaaaa')
    }
  }
}
</script>
