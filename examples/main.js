import '../src/styles/index'

import { createApp } from 'vue'

import App from './app'
import { createRouter, createWebHistory } from 'vue-router';

import VButton from '../src/components/button'
import ButtonGroup from '../src/components/button-group'
import Card from '../src/components/card'
import List from '../src/components/list'
import ListItem from '../src/components/list-item'
import Panel from '../src/components/panel'
import Collapse from '../src/components/collapse'
import Spin from '../src/components/spin'
import Col from '../src/components/col'
import Row from '../src/components/row'
import Split from '../src/components/split'
import Divider from '../src/components/divider'
import Cell from '../src/components/cell'
import CellItem from '../src/components/cell-item'
import CellGroup from '../src/components/cell-group'
import Switch from '../src/components/switch'
import Badge from '../src/components/badge'
import Menu from '../src/components/menu'
import Submenu from '../src/components/submenu'
import MenuGroup from '../src/components/menu-group'
import MenuItem from '../src/components/menu-item'
import Icon from '../src/components/icon'
import Radio from '../src/components/radio'
import RadioGroup from '../src/components/radio-group'
import Affix from '../src/components/affix'
import Dropdown from '../src/components/dropdown'
import Checkbox from '../src/components/checkbox'
import CheckboxGroup from '../src/components/checkbox-group'
import VInput from '../src/components/input'
import VForm from '../src/components/form'
import FormItem from '../src/components/form-item'
import ColorPicker from '../src/components/color-picker'
import VSelect from '../src/components/select'
import VOption from '../src/components/option'
import Avatar from '../src/components/avatar'
import Cascader from '../src/components/cascader'
import Poptip from '../src/components/poptip'
import DropdownMenu from '../src/components/dropdown-menu'
import DropdownItem from '../src/components/dropdown-item'
import InputNumber from '../src/components/input-number'
import Footer from '../src/components/footer'
import Header from '../src/components/header'
import Sider from '../src/components/sider'
import Content from '../src/components/content'
import Layout from '../src/components/layout'
import Table from '../src/components/table'
import Page from '../src/components/page'
import AutoComplete from '../src/components/auto-complete'
import Slider from '../src/components/slider'
import Rate from '../src/components/rate'
import DatePicker from '../src/components/date-picker'
import TimePicker from '../src/components/date-picker/picker/time-picker'

const app = createApp(App)

app.component('VButton', VButton)
app.component('Card', Card)
app.component('List', List)
app.component('ListItem', ListItem)
app.component('Panel', Panel)
app.component('Collapse', Collapse)
app.component('Split', Split)
app.component('Divider', Divider)
app.component('Cell', Cell)
app.component('CellItem', CellItem)
app.component('CellGroup', CellGroup)
app.component('Switch', Switch)
app.component('Badge', Badge)
app.component('Spin', Spin)
app.component('Menu', Menu)
app.component('Submenu', Submenu)
app.component('MenuGroup', MenuGroup)
app.component('MenuItem', MenuItem)
app.component('Icon', Icon)
app.component('Radio', Radio)
app.component('RadioGroup', RadioGroup)
app.component('ButtonGroup', ButtonGroup)
app.component('Affix', Affix)
app.component('VInput', VInput)
app.component('Dropdown', Dropdown)
app.component('Checkbox', Checkbox)
app.component('CheckboxGroup', CheckboxGroup)
app.component('VForm', VForm)
app.component('FormItem', FormItem)
app.component('Col', Col)
app.component('Row', Row)
app.component('ColorPicker', ColorPicker)
app.component('VSelect', VSelect)
app.component('VOption', VOption)
app.component('Avatar', Avatar)
app.component('Cascader', Cascader)
app.component('Poptip', Poptip)
app.component('DropdownMenu', DropdownMenu)
app.component('DropdownItem', DropdownItem)
app.component('InputNumber', InputNumber)
app.component('Footer', Footer)
app.component('Header', Header)
app.component('Sider', Sider)
app.component('Content', Content)
app.component('Layout', Layout)
app.component('VTable', Table)
app.component('Page', Page)
app.component('AutoComplete', AutoComplete)
app.component('DatePicker', DatePicker)
app.component('TimePicker', TimePicker)
app.component('Slider', Slider)
app.component('Rate', Rate)

const router = createRouter({
  history: createWebHistory(),
    routes: [
        {
            path: '/split',
            component: () => import('./routers/split-page.vue')
        },
        {
            path: '/layout',
            component: () => import('./routers/layout-page.vue')
        },
        {
            path: '/affix',
            component: () => import('./routers/affix-page.vue')
        },
        {
            path: '/anchor',
            component: () => import('./routers/anchor-page.vue')
        },
        {
            path: '/grid',
            component: () => import('./routers/grid-page.vue')
        },
        {
            path: '/button',
            component: () => import('./routers/button-page.vue')
        },
        {
            path: '/input',
            component: () => import('./routers/input-page.vue')
        },
        {
            path: '/radio',
            component: () => import('./routers/radio-page.vue')
        },
        {
            path: '/checkbox',
            component: () => import('./routers/checkbox-page.vue')
        },
        {
            path: '/steps',
            component: () => import('./routers/steps-page.vue')
        },
        {
            path: '/timeline',
            component: () => import('./routers/timeline-page.vue')
        },
        {
            path: '/switch',
            component: () => import('./routers/switch-page.vue')
        },
        {
            path: '/alert',
            component: () => import('./routers/alert-page.vue')
        },
        {
            path: '/badge',
            component: () => import('./routers/badge-page.vue')
        },
        {
            path: '/tag',
            component: () => import('./routers/tag-page.vue')
        },
        {
            path: '/input-number',
            component: () => import('./routers/input-number-page.vue')
        },
        {
            path: '/upload',
            component: () => import('./routers/upload-page.vue')
        },
        {
            path: '/progress',
            component: () => import('./routers/progress-page.vue')
        },
        {
            path: '/collapse',
            component: () => import('./routers/collapse-page.vue')
        },
        {
            path: '/carousel',
            component: () => import('./routers/carousel-page.vue')
        },
        {
            path: '/card',
            component: () => import('./routers/card-page.vue')
        },
        {
            path: '/tree',
            component: () => import('./routers/tree-page.vue')
        },
        {
            path: '/rate',
            component: () => import('./routers/rate-page.vue')
        },
        {
            path: '/circle',
            component: () => import('./routers/circle-page.vue')
        },
        {
            path: '/tabs',
            component: () => import('./routers/tabs-page.vue')
        },
        {
            path: '/tooltip',
            component: () => import('./routers/tooltip-page.vue')
        },
        {
            path: '/poptip',
            component: () => import('./routers/poptip-page.vue')
        },
        {
            path: '/slider',
            component: () => import('./routers/slider-page.vue')
        },
        {
            path: '/dropdown',
            component: () => import('./routers/dropdown-page.vue')
        },
        {
            path: '/breadcrumb',
            component: () => import('./routers/breadcrumb-page.vue')
        },
        {
            path: '/menu',
            component: () => import('./routers/menu-page.vue')
        },
        {
            path: '/spin',
            component: () => import('./routers/spin-page.vue')
        },
        {
            path: '/cascader',
            component: () => import('./routers/cascader-page.vue')
        },
        {
            path: '/select',
            component: () => import('./routers/select-page.vue')
        },
        {
            path: '/backtop',
            component: () => import('./routers/back-top-page.vue')
        },
        {
            path: '/page',
            component: () => import('./routers/page-page.vue')
        },
        {
            path: '/transfer',
            component: () => import('./routers/transfer-page.vue')
        },
        {
            path: '/date',
            component: () => import('./routers/date-page.vue')
        },
        {
            path: '/form',
            component: () => import('./routers/form-page.vue')
        },
        {
            path: '/table',
            component: () => import('./routers/table-page.vue')
        },
        {
            path: '/loading-bar',
            component: () => import('./routers/loading-bar-page.vue')
        },
        {
            path: '/modal',
            component: () => import('./routers/modal-page.vue')
        },
        {
            path: '/message',
            component: () => import('./routers/message-page.vue')
        },
        {
            path: '/notice',
            component: () => import('./routers/notice-page.vue')
        },
        {
            path: '/avatar',
            component: () => import('./routers/avatar-page.vue')
        },
        {
            path: '/color-picker',
            component: () => import('./routers/color-picker-page.vue')
        },
        {
            path: '/auto-complete',
            component: () => import('./routers/auto-complete-page.vue')
        },
        {
            path: '/scroll',
            component: () => import('./routers/scroll-page.vue')
        },
        {
            path: '/divider',
            component: () => import('./routers/divider-page.vue')
        },
        {
            path: '/time',
            component: () => import('./routers/time-page.vue')
        },
        {
            path: '/cell',
            component: () => import('./routers/cell-page.vue')
        },
        {
            path: '/drawer',
            component: () => import('./routers/drawer-page.vue')
        },
        {
            path: '/icon',
            component: () => import('./routers/icon-page.vue')
        },
        {
            path: '/list',
            component: () => import('./routers/list-page.vue')
        }
    ]
});

app.use(router)

document.addEventListener('DOMContentLoaded', () => {
  app.mount('#app')
})
