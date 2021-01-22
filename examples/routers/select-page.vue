<template>
  <div style="margin: 100px;">
    <VSelect
      v-model="model1"
      filterable
      style="width:200px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <VSelect
      v-model="model10"
      filterable
      :max-tag-count="2"
      multiple
      style="width:400px"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <VSelect
      v-model="model10"
      filterable
      :max-tag-count="2"
      multiple
      style="width:400px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <br><br>

    <VSelect
      v-model="model1"
      style="width:200px"
    >
    <template #prefix>
      <Icon
        type="ios-alarm"
        color="red"
      />
    </template>
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <VSelect
      v-model="model1"
      style="width:200px"
    >
      <template #prefix>
        <Avatar
          src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          size="small"
        />
      </template>
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <VSelect
      v-model="model10"
      :max-tag-count="3"
      :max-tag-placeholder="more"
      multiple
      style="width:400px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <br><br>

    <VSelect
      v-model="model1"
      size="small"
      style="width:200px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <VSelect
      v-model="model10"
      size="small"
      multiple
      style="width:400px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <br><br>

    <VSelect
      v-model="model1"
      size="large"
      style="width:200px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>

    <VSelect
      v-model="model10"
      size="large"
      multiple
      style="width:400px"
      prefix="ios-albums"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>
    <Divider />
    <VSelect
      v-model="model13"
      filterable
      allow-create
      style="width:260px"
      @on-create="handleCreate"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>
    <VSelect
      v-model="model12"
      multiple
      filterable
      allow-create
      style="width:260px"
      @on-create="handleCreate"
    >
      <VOption
        v-for="item in cityList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </VOption>
    </VSelect>
    <Divider />
    <VSelect
      v-model="model31"
      size="small"
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
    <VSelect
      v-model="model31"
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
    <VSelect
      v-model="model31"
      size="large"
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
    <Divider />
    <VSelect
      v-model="model31"
      filterable
      size="small"
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
    <VSelect
      v-model="model31"
      filterable
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
    <VSelect
      v-model="model31"
      filterable
      size="large"
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
    <Divider />
    <VSelect
      v-model="model34"
      multiple
      size="small"
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
    <VSelect
      v-model="model34"
      multiple
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
    <VSelect
      v-model="model34"
      multiple
      size="large"
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
    <Divider />
    <VSelect
      v-model="model34"
      filterable
      multiple
      size="small"
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
    <VSelect
      v-model="model34"
      filterable
      multiple
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
    <VSelect
      v-model="model34"
      filterable
      allow-create
      multiple
      size="large"
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
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      model1: '',
      model10: [],
      model12: [],
      model13: '',
      model31: '',
      model32: '',
      model33: '',
      model34: [],
      model35: [],
      model36: []
    }
  },
  methods: {
    more (num) {
      return 'more' + num
    },
    handleCreate (val) {
      console.log(111, val)
      this.cityList.push({
        value: val,
        label: val
      })
    }
  }
}
</script>
