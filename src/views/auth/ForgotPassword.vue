<template>
  <v-container
    class="d-flex flex-column justify-space-between white"
    fluid
    style="height: 100%"
    >
    <v-row
      align="center"
      justify="center"
      column
      >
      <v-col
        cols="12"
        class="d-flex flex-column justify-center align-center"
        >
        <ValidationObserver
          v-slot="{ invalid, passes }"
          class="form"
          >
          <v-card flat>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-toolbar-title class="form-title">{{$t('pages.forgot_password.form_title')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="form-content">
              <v-form
                @submit.prevent="passes(submit)"
                @keyup.native.enter="passes(submit)"
                >
                <ValidationProvider
                  :name="$t('pages.login.input_user')"
                  rules="required|email"
                  v-slot="{ errors }"
                  >
                  <v-text-field
                    :label="$t('pages.login.input_user')"
                    name="email"
                    v-model="formData.email"
                    type="text"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.login.input_user')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>
              </v-form>
            </v-card-text>
            <v-card-actions class="form-action d-flex flex-column">
              <button-submit
                block
                :text="$t('pages.forgot_password.button_submit')"
                :disabled="invalid"
                :dark="!invalid"
                :loading="submitting"
                @click="passes(submit)"/>

              <v-row
                dense
                class="form-action-link"
                >
                <v-col
                  cols="12"
                  class="pa-0 d-flex justify-center"
                  >
                  <a @click="$router.push({name: 'login'})">{{$t('pages.forgot_password.button_back_to_login')}}</a>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-col>
    </v-row>
    <p class="account-footer text-center mb-0">
      <small>&copy; 2020 - eDrop Team</small>
    </p>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import ButtonSubmit from '@/components/button/ButtonSubmit.vue'

export default {
  name: 'ForgotPassword',
  components: {
    ButtonSubmit
  },
  data: () => ({
    submitting: false,
    formData: {
      email: ''
    }
  }),
  computed: {
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    async submit () {
      this.submitting = true
      await this.forgotPassword(this.formData)
      this.submitting = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/sass/styles/layouts/_auth.scss"
</style>
