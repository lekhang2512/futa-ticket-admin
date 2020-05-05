<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
         <v-card>
          <v-toolbar dense>
            <back-button @click="() => { $router.back() }" />
            <v-toolbar-title>Cập nhật thông tin user</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <Form
              ref="form"
              type="update"
              @submit="submit"
              :btn-loading="btnLoading"
            />
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import Form from './Form.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserUpdate',
  components: {
    Form
  },
  data () {
    return {
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['update', 'getDetail']),
    async submit (data) {
      this.btnLoading = true
      await this.update({
        id: this.$route.params.id,
        data: data,
        cb: () => {
          this.$refs.form.$emit('init', {})
          this.$router.push({'name': 'user', query: this.parseListParrams() })
        }
      })
      this.btnLoading = false
    },
    parseListParrams () {
      try {
        let params = JSON.parse(this.$route.query.list)
        params.rf = 1
        return params
      } catch(e) {
        return {rf: 1}
      }
    },
    initForm () {
      if (this.$route.params.id) {
        this.getDetail({
          id: this.$route.params.id,
          query: {
            include: 'roles'
          },
          cb: (data) => {
            let roles = data.roles.data.map(item => item.id)
            this.$refs.form.$emit('init', Object.assign({}, data, {roles: roles}))
          }
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initForm()
    })
  }
}
</script>
