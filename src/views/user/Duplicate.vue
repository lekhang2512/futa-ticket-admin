<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
         <v-card>
          <v-toolbar dense>
            <back-button @click="() => { $router.back() }" />
            <v-toolbar-title>{{$t('title.user_duplicate')}}</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <Form
              ref="form"
              type="create"
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
  name: 'UserDuplicate',
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
    ...mapActions('user', ['create', 'getDetail']),
    async submit (data) {
      this.btnLoading = true
      await this.create({
        data: data,
        cb: () => {
          this.$refs.form.$emit('init', {})
          this.$router.push({ 'name': 'user' })
        }
      })
      this.btnLoading = false
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
