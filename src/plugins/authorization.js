import Vue from 'vue'

Vue.mixin({
  methods: {
    can (permissions) {
      if (!permissions.length) {
        return true
      }

      if (!this.$store.state.auth.user.id) {
        return false
      }

      let groups = Object.values(this.$store.state.auth.user.groups || {})

      if (this.arrayIntersect(groups, ['super_admin']).length) {
        return true
      }

      return !!this.arrayIntersect(groups, permissions).length
    },
    access(service, object, action) {
      let _service = this.$store.state.auth.permissions[service] || {}
      let _object = _service[object] || {}
      let _groups = _object[action] || []
      return this.can(_groups)
    }
  }
})
