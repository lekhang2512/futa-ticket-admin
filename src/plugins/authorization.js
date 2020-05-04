import Vue from 'vue'

Vue.mixin({
  methods: {
    access(object, action) {
      let permissions = this.$store.state.auth.permissions || {}
      if ('admin.super-admin' in permissions) {
        return true
      }
      if (`${object}.${action}` in permissions && permissions[`${object}.${action}`]) {
        return true
      } else {
        return false
      }
    }
  }
})
