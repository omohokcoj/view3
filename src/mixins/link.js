import { oneOf } from '../utils/assist'

export default {
  props: {
    to: {
      type: [Object, String]
    },
    replace: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      validator (value) {
        return oneOf(value, ['_blank', '_self', '_parent', '_top'])
      },
      default: '_self'
    },
    append: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    linkUrl () {
      const type = typeof this.to

      if (typeof this.to === 'string' && this.to.includes('//')) {
        /* Absolute URL, we do not need to route this */
        return this.to
      }
      const router = this.$router
      if (router) {
        const current = this.$route
        const route = router.resolve(this.to, current, this.append)

        return route.name ? route.href : this.to
      }
      return this.to
    }
  },
  methods: {
    handleClick (newWindow = false) {
      const router = this.$router

      if (newWindow) {
        let to = this.to
        if (router) {
          const current = this.$route
          const route = router.resolve(this.to, current, this.append)
          to = route.name ? route.href : this.to
        }
        window.open(to)
      } else {
        if (router) {
          if ((typeof this.to === 'string') && !router.resolve(this.to, this.$route, this.append).name) {
            window.location.href = this.to
          } else {
            this.replace ? this.$router.replace(this.to, () => {}) : this.$router.push(this.to, () => {})
          }
        } else {
          window.location.href = this.to
        }
      }
    },
    handleCheckClick (event, newWindow = false) {
      if (this.to) {
        if (this.target === '_blank') {
          return false
        } else {
          event.preventDefault()
          this.handleClick(newWindow)
        }
      }
    }
  }
}
