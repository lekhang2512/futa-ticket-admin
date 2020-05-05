<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
         <v-card>
          <v-toolbar dense>
            <back-button @click="() => { $router.back() }" />
            <v-toolbar-title>{{$t('title.role_create')}}</v-toolbar-title>
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
import { mapActions } from 'vuex'
export default {
  name: 'RoleCreate',
  components: {
    Form
  },
  data () {
    return {
      btnLoading: false
    }
  },
  methods: {
    ...mapActions('role', ['create']),
    async submit (data) {
      console.log('submit')
      this.btnLoading = true
      await this.create({
        data: data,
        cb: () => {
          this.$refs.form.$emit('init', {})
          this.$router.push({ 'name': 'role' })
        }
      })
      this.btnLoading = false
    }
  }
}
</script>
