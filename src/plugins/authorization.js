import Vue from 'vue'
import { mapGetters } from 'vuex'
import { isEmpty } from 'lodash'

Vue.mixin({
  computed: {
    ...mapGetters('auth', ['permissions'])
  },
  methods: {
    access(object, action) {
      if (!isEmpty(this.permissions)) {
        if ('admin.super-admin' in this.permissions) {
          return true
        }
        if (`${object}.${action}` in this.permissions && this.permissions[`${object}.${action}`]) {
          return true
        } else {
          return false
        }
      }
    }
  }
})
