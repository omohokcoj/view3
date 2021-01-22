<template>
  <div style="margin: 100px;">
    <Row :gutter="64">
      <Col span="12">
        <VForm
          ref="formValidate1"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem
            label="Name"
            prop="name"
          >
            <VInput              v-model="formValidate.name"
              placeholder="Enter your name"
            />
          </FormItem>
          <FormItem
            label="E-mail"
            prop="mail"
          >
            <VInput              v-model="formValidate.mail"
              placeholder="Enter your e-mail"
            />
          </FormItem>
          <FormItem
            label="City"
            prop="city"
          >
            <VSelect
              v-model="formValidate.city"
              placeholder="Select your city"
            >
              <VOption value="beijing">
                New York
              </VOption>
              <VOption value="shanghai">
                London
              </VOption>
              <VOption value="shenzhen">
                Sydney
              </VOption>
            </VSelect>
          </FormItem>
          <FormItem label="Date">
            <Row>
              <Col span="11" >
              <FormItem prop="date">
                <DatePicker
                  v-model="formValidate.date"
                  type="date"
                  placeholder="Select date"
                />
              </FormItem>
              </Col>
              <Col
                span="2"
                style="text-align: center"
              >-</Col>
              <Col span="11" >
              <FormItem prop="time">
                <TimePicker
                  v-model="formValidate.time"
                  type="time"
                  placeholder="Select time"
                />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            label="Gender"
            prop="gender"
          >
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">
                Male
              </Radio>
              <Radio label="female">
                Female
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            label="Hobby"
            prop="interest"
          >
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat" />
              <Checkbox label="Sleep" />
              <Checkbox label="Run" />
              <Checkbox label="Movie" />
            </CheckboxGroup>
          </FormItem>
          <FormItem
            label="Desc"
            prop="desc"
          >
            <VInput              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            />
          </FormItem>
          <FormItem
            label="Switch"
            prop="switch"
          >
            <Switch v-model="formValidate.switch" />
          </FormItem>
          <FormItem
            label="Slider"
            prop="slider"
          >
            <Slider v-model="formValidate.slider" />
          </FormItem>
          <FormItem
            label="AutoComplete"
            prop="autoComplete"
          >
            <AutoComplete
              v-model="formValidate.autoComplete"
              :data="data1"
              placeholder="input here"
              style="width:200px"
              @on-search="handleSearch1"
            />
          </FormItem>
          <FormItem
            label="cascader"
            prop="cascader"
          >
            <Cascader
              v-model="formValidate.cascader"
              :data="data2"
            />
          </FormItem>
          <FormItem
            label="inputNumber"
            prop="inputNumber"
          >
            <InputNumber
              v-model="formValidate.inputNumber"
              :max="10"
              :min="1"
            />
          </FormItem>
          <FormItem
            label="rate"
            prop="rate"
          >
            <Rate v-model="formValidate.rate" />
          </FormItem>
          <!-- <FormItem -->
          <!--   label="colorPicker" -->
          <!--   prop="colorPicker" -->
          <!-- > -->
          <!--   <ColorPicker v&#45;model="formValidate.colorPicker" /> -->
          <!-- </FormItem> -->
          <!-- <FormItem -->
          <!--   label="upload" -->
          <!--   prop="upload" -->
          <!-- > -->
          <!--   <Upload action="//jsonplaceholder.typicode.com/posts/"> -->
          <!--     <VButton icon="ios&#45;cloud&#45;upload&#45;outline"> -->
          <!--       Upload files -->
          <!--     </VButton> -->
          <!--   </Upload> -->
          <!-- </FormItem> -->
          <FormItem>
            <VButton
              type="primary"
              @click="handleSubmit('formValidate1')"
            >
              Submit
            </VButton>
            <VButton
              style="margin-left: 8px"
              @click="handleReset('formValidate1')"
            >
              Reset
            </VButton>
          </FormItem>
        </VForm>
      </Col>
      <Col span="12">
        <VForm
          ref="formValidate2"
          disabled
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem
            label="Name"
            prop="name"
          >
            <VInput              v-model="formValidate.name"
              placeholder="Enter your name"
            />
          </FormItem>
          <FormItem
            label="E-mail"
            prop="mail"
          >
            <VInput              v-model="formValidate.mail"
              placeholder="Enter your e-mail"
            />
          </FormItem>
          <FormItem
            label="City"
            prop="city"
          >
            <VSelect
              v-model="formValidate.city"
              placeholder="Select your city"
            >
              <VOption value="beijing">
                New York
              </VOption>
              <VOption value="shanghai">
                London
              </VOption>
              <VOption value="shenzhen">
                Sydney
              </VOption>
            </VSelect>
          </FormItem>
          <FormItem label="Date">
            <Row>
              <Col span="11" >
              <FormItem prop="date">
                <DatePicker
                  v-model="formValidate.date"
                  type="date"
                  placeholder="Select date"
                />
              </FormItem>
              </Col>
              <Col
                span="2"
                style="text-align: center"
              >-</Col>
              <Col span="11" >
              <FormItem prop="time">
                <TimePicker
                  v-model="formValidate.time"
                  type="time"
                  placeholder="Select time"
                />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            label="Gender"
            prop="gender"
          >
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">
                Male
              </Radio>
              <Radio label="female">
                Female
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            label="Hobby"
            prop="interest"
          >
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat" />
              <Checkbox label="Sleep" />
              <Checkbox label="Run" />
              <Checkbox label="Movie" />
            </CheckboxGroup>
          </FormItem>
          <FormItem
            label="Desc"
            prop="desc"
          >
            <VInput              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            />
          </FormItem>
          <FormItem
            label="Switch"
            prop="switch"
          >
            <Switch v-model="formValidate.switch" />
          </FormItem>
          <FormItem
            label="Slider"
            prop="slider"
          >
            <Slider v-model="formValidate.slider" />
          </FormItem>
          <FormItem
            label="AutoComplete"
            prop="autoComplete"
          >
            <AutoComplete
              v-model="formValidate.autoComplete"
              :data="data1"
              placeholder="input here"
              style="width:200px"
              @on-search="handleSearch1"
            />
          </FormItem>
          <FormItem
            label="cascader"
            prop="cascader"
          >
            <Cascader
              v-model="formValidate.cascader"
              :data="data2"
            />
          </FormItem>
          <FormItem
            label="inputNumber"
            prop="inputNumber"
          >
            <InputNumber
              v-model="formValidate.inputNumber"
              :max="10"
              :min="1"
            />
          </FormItem>
          <FormItem
            label="rate"
            prop="rate"
          >
            <Rate v-model="formValidate.rate" />
          </FormItem>
          <!-- <FormItem -->
          <!--   label="colorPicker" -->
          <!--   prop="colorPicker" -->
          <!-- > -->
          <!--   <ColorPicker v&#45;model="formValidate.colorPicker" /> -->
          <!-- </FormItem> -->
          <!-- <FormItem -->
          <!--   label="upload" -->
          <!--   prop="upload" -->
          <!-- > -->
          <!--   <Upload action="//jsonplaceholder.typicode.com/posts/"> -->
          <!--     <VButton icon="ios&#45;cloud&#45;upload&#45;outline"> -->
          <!--       Upload files -->
          <!--     </VButton> -->
          <!--   </Upload> -->
          <!-- </FormItem> -->
          <FormItem>
            <VButton
              type="primary"
              @click="handleSubmit('formValidate2')"
            >
              Submit
            </VButton>
            <VButton
              style="margin-left: 8px"
              @click="handleReset('formValidate2')"
            >
              Reset
            </VButton>
          </FormItem>
        </VForm>
      </Col>
      <Col span="6">
        <VForm
          ref="formValidate5"
          :model="formValidate5"
        >
          <FormItem
            label="name"
            prop="name"
          >
            <VInput              v-model="formValidate5.name"
              placeholder="Enter your name"
            />
          </FormItem>
          <FormItem label="name">
            <Switch v-model="formValidate5.msgCheck" />
          </FormItem>
          <FormItem
            v-if="formValidate5.msgCheck"
            label="msg"
            prop="msg"
            :rules="[{
              required: true
            }]"
          >
            <VInput              v-model="formValidate5.msg"
              placeholder="msg"
            />
          </FormItem>
          <FormItem>
            <VButton
              type="primary"
              @click="handleSubmit('formValidate5')"
            >
              Submit
            </VButton>
          </FormItem>
        </VForm>
      </Col>
    </Row>
    <div style="margin: 100px;width: 200px;">
      <Divider>普通组件</Divider>
      <VButton>123</VButton>
      <VButton disabled>
        123
      </VButton>
      <br>
      <VInput value="" />
      <VInput        value=""
        disabled
      />
      <br>
      <Radio :value="false">
        Radio
      </Radio>
      <Radio
        :value="false"
        disabled
      >
        Radio
      </Radio>
      <RadioGroup value="爪哇犀牛">
        <Radio label="金斑蝶" />
        <Radio label="爪哇犀牛" />
        <Radio label="印度黑羚" />
      </RadioGroup>
      <RadioGroup value="爪哇犀牛">
        <Radio
          label="金斑蝶"
          disabled
        />
        <Radio label="爪哇犀牛" />
        <Radio label="印度黑羚" />
      </RadioGroup>
      <br>
      <Checkbox :value="false">
        Checkbox
      </Checkbox>
      <Checkbox
        :value="false"
        disabled
      >
        Checkbox
      </Checkbox>
      <CheckboxGroup :value="['香蕉']">
        <Checkbox label="香蕉" />
        <Checkbox
          label="苹果"
          disabled
        />
        <Checkbox label="西瓜" />
      </CheckboxGroup>
      <br>
      <Switch :value="false" />
      <Switch
        :value="false"
        disabled
      />
      <br>
      <VSelect
        value="London"
        disabled
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
        value="London"
        style="width:200px"
      >
        <VOption value="beijing">
          New York
        </VOption>
        <VOption
          value="shanghai"
          disabled
        >
          London
        </VOption>
        <VOption value="shenzhen">
          Sydney
        </VOption>
      </VSelect>
      <VSelect
        value=""
        filterable
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
        value=""
        filterable
        disabled
      >
        <VOption
          v-for="item in cityList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </VOption>
      </VSelect>
      <br>
      <Slider :value="20" />
      <Slider
        :value="20"
        disabled
      />
      <br>
      <AutoComplete
        v-model="value1"
        :data="data1"
        placeholder="input here"
        style="width:200px"
        @on-search="handleSearch1"
      />
      <AutoComplete
        v-model="value1"
        :data="data1"
        placeholder="input here"
        disabled
        style="width:200px"
        @on-search="handleSearch1"
      />
      <br>
      <DatePicker
        type="date"
        placeholder="Select date"
        style="width: 200px"
      />
      <DatePicker
        type="date"
        placeholder="Select date"
        style="width: 200px"
        disabled
      />
      <br>
      <TimePicker
        type="time"
        placeholder="Select time"
        style="width: 168px"
      />
      <TimePicker
        type="time"
        placeholder="Select time"
        style="width: 168px"
        disabled
      />
      <br>
      <Cascader :data="data2" />
      <Cascader
        :data="data2"
        disabled
      />
      <br>
      <InputNumber
        :max="10"
        :min="1"
        :value="2"
      />
      <InputNumber
        :max="10"
        :min="1"
        :value="2"
        disabled
      />
      <br>
      <Rate :value="3" />
      <Rate
        :value="3"
        disabled
      />
      <br>
      <!-- <ColorPicker value="#19be6b" /> -->
      <!-- <ColorPicker -->
      <!--   value="#19be6b" -->
      <!--   disabled -->
      <!-- /> -->
      <br>
      <!-- <Upload action="//jsonplaceholder.typicode.com/posts/"> -->
      <!--   <VButton icon="ios&#45;cloud&#45;upload&#45;outline"> -->
      <!--     Upload files -->
      <!--   </VButton> -->
      <!-- </Upload> -->
      <!-- <Upload -->
      <!--   action="//jsonplaceholder.typicode.com/posts/" -->
      <!--   disabled -->
      <!-- > -->
      <!--   <VButton icon="ios&#45;cloud&#45;upload&#45;outline"> -->
      <!--     Upload files -->
      <!--   </VButton> -->
      <!-- </Upload> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: '',
      data1: [],
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: '',
        switch: false,
        slider: 20,
        autoComplete: '',
        cascader: [],
        inputNumber: 2,
        rate: 3,
        colorPicker: ''
      },
      formValidate5: {
        name: '',
        msgCheck: false,
        msg: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        slider: [
          { required: true, type: 'number', message: 'Slider', trigger: 'change' }
        ],
        switch: [
          { required: true, type: 'boolean', message: 'Switch...', trigger: 'change' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
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
      data2: [{
        value: 'zhejiang',
        label: '浙江',
        children: [{
          value: 'hangzhou',
          label: '杭州',
          children: [{
            value: 'xihu',
            label: '西湖'
          }]
        }]
      }, {
        value: 'jiangsu',
        label: '江苏',
        disabled: true,
        children: [{
          value: 'nanjing',
          label: '南京',
          children: [{
            value: 'zhonghuamen',
            label: '中华门'
          }]
        }]
      }]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSearch1 (value) {
      this.data1 = !value
        ? []
        : [
            value,
            value + value,
            value + value + value
          ]
    }
  }
}
</script>
