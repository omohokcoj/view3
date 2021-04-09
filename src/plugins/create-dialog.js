import { createApp, h } from 'vue'

import Modal from '../components/modal'
import Button from '../components/button'
import Locale from '../mixins/locale'

const prefixCls = 'ivu-modal-confirm'

function createInstance (properties) {
  let component
  let node
  const _props = properties || {}

  const instance = createApp({
    mixins: [Locale],
    data () {
      return Object.assign({}, _props, {
        visible: false,
        width: 416,
        title: '',
        body: '',
        iconType: '',
        iconName: '',
        okText: undefined,
        cancelText: undefined,
        showCancel: false,
        loading: false,
        buttonLoading: false,
        scrollable: false,
        closable: false,
        closing: false
      })
    },
    computed: {
      iconTypeCls () {
        return [
          `${prefixCls}-head-icon`,
          `${prefixCls}-head-icon-${this.iconType}`
        ]
      },
      iconNameCls () {
        return [
          'ion',
          `ion-${this.iconName}`
        ]
      },
      localeOkText () {
        if (this.okText) {
          return this.okText
        } else {
          return this.t('i.modal.okText')
        }
      },
      localeCancelText () {
        if (this.cancelText) {
          return this.cancelText
        } else {
          return this.t('i.modal.cancelText')
        }
      }
    },
    methods: {
      cancel () {
        if (this.closing) return
        component.visible = false
        this.buttonLoading = false
        this.onCancel()
        this.remove()
      },
      ok () {
        if (this.closing) return
        if (this.loading) {
          this.buttonLoading = true
        } else {
          component.visible = false
          this.remove()
        }
        this.onOk()
      },
      remove () {
        this.closing = true
        setTimeout(() => {
          this.closing = false
          this.destroy()
        }, 300)
      },
      destroy () {
        if (this.$el) document.body.removeChild(this.$el)
        this.onRemove()
      },
      onOk () {},
      onCancel () {},
      onRemove () {}
    },
    render () {
      const footerVNodes = []
      if (this.showCancel) {
        footerVNodes.push(h(Button, {
          type: 'text',
          onClick: this.cancel
        }, { default: () => this.localeCancelText }))
      }
      footerVNodes.push(h(Button, {
        type: 'primary',
        loading: this.buttonLoading,
        onClick: this.ok
      }, { default: () => this.localeOkText }))

      // render content
      let body_render
      if (this.render) {
        body_render = h('div', {
          class: `${prefixCls}-body ${prefixCls}-body-render`
        }, [this.render(h)])
      } else {
        body_render = h('div', {
          class: `${prefixCls}-body`
        }, [
          h('div', {
            innerHTML: this.body
          })
        ])
      }

      // when render with no title, hide head
      let head_render
      if (this.title) {
        head_render = h('div', {
          class: `${prefixCls}-head`
        }, [
          h('div', {
            class: this.iconTypeCls
          }, [
            h('i', {
              class: this.iconNameCls
            })
          ]),
          h('div', {
            class: `${prefixCls}-head-title`,
            innerHTML: this.title
          })
        ])
      }

      node = h(Modal, Object.assign({}, _props, {
        width: this.width,
        scrollable: this.scrollable,
        closable: this.closable,
        modelValue: this.visible,
        onInput: (status) => {
          this.visible = status
        },
        onOnCancel: this.cancel
      }), () => [
        h('div', {
          class: prefixCls
        }, [
          head_render,
          body_render,
          h('div', {
            class: `${prefixCls}-footer`
          }, footerVNodes)
        ])
      ])

      return node
    }
  })

  const elem = document.createElement('div')

  document.body.appendChild(instance.mount(elem).$el)

  component = node.component.proxy

  return {
    show (props) {
      component.$parent.showCancel = props.showCancel
      component.$parent.iconType = props.icon

      switch (props.icon) {
        case 'info':
          component.$parent.iconName = 'ios-information-circle'
          break
        case 'success':
          component.$parent.iconName = 'ios-checkmark-circle'
          break
        case 'warning':
          component.$parent.iconName = 'ios-alert'
          break
        case 'error':
          component.$parent.iconName = 'ios-close-circle'
          break
        case 'confirm':
          component.$parent.iconName = 'ios-help-circle'
          break
      }

      if ('width' in props) {
        component.$parent.width = props.width
      }

      if ('closable' in props) {
        component.$parent.closable = props.closable
      }

      if ('title' in props) {
        component.$parent.title = props.title
      }

      if ('content' in props) {
        component.$parent.body = props.content
      }

      if ('okText' in props) {
        component.$parent.okText = props.okText
      }

      if ('cancelText' in props) {
        component.$parent.cancelText = props.cancelText
      }

      if ('onCancel' in props) {
        component.$parent.onCancel = props.onCancel
      }

      if ('onOk' in props) {
        component.$parent.onOk = props.onOk
      }

      // async for ok
      if ('loading' in props) {
        component.$parent.loading = props.loading
      }

      if ('scrollable' in props) {
        component.$parent.scrollable = props.scrollable
      }

      component.$parent.onRemove = props.onRemove

      component.visible = true
    },
    remove () {
      component.visible = false
      component.$parent.buttonLoading = false
      component.$parent.remove()
    },
    component
  }
};

export default createInstance
