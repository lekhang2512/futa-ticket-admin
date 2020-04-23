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
        class="d-flex flex-column justify-center align-center white"
        >
        <ValidationObserver
          v-slot="{ invalid, passes }"
          class="form"
          >
          <v-card flat>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-toolbar-title class="form-title">{{$t('pages.login.form_title')}}</v-toolbar-title>
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
                    name="username"
                    v-model="formData.username"
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
                <ValidationProvider
                  :name="$t('pages.login.input_password')"
                  rules="required"
                  v-slot="{ errors }"
                  >
                  <v-text-field
                    id="password"
                    v-model="formData.password"
                    :label="$t('pages.login.input_password')"
                    name="password"
                    type="password"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.login.input_password')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>
              </v-form>
            </v-card-text>
            <v-card-actions class="form-action d-flex flex-column">
              <button-submit
                block
                :text="$t('pages.login.button_login')"
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
                  sm="6"
                  class="pa-0 d-flex justify-center"
                  >
                  <a target="blank" @click="$router.push({name: 'forgot-password'})">{{$t('pages.login.button_forgot_password')}}</a>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="pa-0 d-flex justify-center"
                  >
                  <a @click="redirectRegister()">{{$t('pages.login.button_register')}}</a>
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

export default {
  name: 'Login',
  components: {
  },
  data: () => ({
    submitting: false,
    formData: {
      username: '',
      password: ''
    }
  }),
  computed: {
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit () {
      this.submitting = true
      await this.login(this.formData)
      this.submitting = false
    },
    redirectRegister () {
      this.$router.push({
        name: 'register',
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/sass/styles/layouts/_auth.scss";
.v-content {
  padding: 0 !important;
}
</style>
