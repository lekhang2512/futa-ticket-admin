<template>
  <v-container
    class="d-flex flex-column justify-space-between white"
    fluid
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
              <v-toolbar-title class="form-title">{{$t('pages.register.form_title')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="form-content">
              <!-- <p class="black--text">{{$t('pages.register.can_register')}} <a class="form-action-link font-weight-bold">{{$t('pages.register.button_facebook')}}</a> {{$t('pages.register.or')}} <a class="form-action-link font-weight-bold">{{$t('pages.register.button_google')}}</a></p> -->
              <v-form
                @submit.prevent="passes(submit)"
                @keyup.native.enter="passes(submit)"
                >
                <!-- <ValidationProvider
                  :name="$t('pages.register.select_group')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    name="city_code"
                    v-model="friends"
                    :items="groups"
                    item-text="name"
                    item-value="value"
                    :label="$t('pages.register.select_group')"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    return-object
                  ></v-autocomplete>
                </ValidationProvider> -->

                <ValidationProvider
                  :name="$t('pages.register.input_name')"
                  rules="required"
                  v-slot="{ errors }"
                  >
                  <v-text-field
                    :label="$t('pages.register.input_name')"
                    name="name"
                    v-model="formData.name"
                    type="text"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.register.input_name')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  :name="$t('pages.register.input_phone')"
                  rules="required|numeric"
                  v-slot="{ errors }"
                  >
                  <v-text-field
                    :label="$t('pages.register.input_phone')"
                    name="phone"
                    v-model="formData.phone"
                    type="text"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.register.input_phone')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  :name="$t('pages.register.input_email')"
                  rules="required|email"
                  v-slot="{ errors }"
                  >
                  <v-text-field
                    :label="$t('pages.register.input_email')"
                    name="username"
                    v-model="formData.email"
                    type="text"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.register.input_email')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  :name="$t('pages.register.input_password')"
                  rules="required"
                  v-slot="{ errors }"
                  :ref="$t('pages.register.input_password')"
                  >
                  <v-text-field
                    id="password"
                    v-model="formData.password"
                    :label="$t('pages.register.input_password')"
                    name="password"
                    type="password"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.register.input_password')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  :name="$t('pages.register.input_password_confirmation')"
                  :rules="`required|confirmed:${$t('pages.register.input_password')}`"
                  v-slot="{ errors }"
                  >
                  <v-text-field
                    id="password_confirmation"
                    v-model="formData.password_confirmation"
                    :label="$t('pages.register.input_password_confirmation')"
                    name="password_confirmation"
                    type="password"
                    :messages="errors[0] || ''"
                    :error="!!errors.length"
                    >
                    <template v-slot:label>
                      <div class="form-input-label">
                        {{$t('pages.register.input_password_confirmation')}}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  :name="$t('pages.register.input_recaptcha')"
                  rules="required"
                  v-slot="{ errors }"
                  >
                  <div class="d-flex justify-center">
                    <vue-recaptcha
                      ref="recaptcha"
                      :sitekey="googleReCaptchaSiteKey"
                      @verify="onCaptchaVerified"
                      @expired="onCaptchaExpired"
                      :loadRecaptchaScript="true"
                      language="vi"
                      >
                    </vue-recaptcha>
                    <input
                      id="recaptcha"
                      v-model="formData.recaptchaToken"
                      name="recaptcha"
                      type="hidden"
                    />
                  </div>
                </ValidationProvider>
              </v-form>
            </v-card-text>
            <v-card-actions class="form-action d-flex flex-column">
              <button-submit
                block
                :text="$t('pages.register.button_register')"
                :disabled="invalid"
                :dark="!invalid"
                :loading="submitting"
                @click="passes(submit)"/>

              <span class="d-flex mt-5">
                <span class="d-none d-sm-flex mr-1">{{ $t('pages.register.heading') }}</span>
                <a
                  @click="redirectLogin()"
                  class="form-action-links font-weight-bold"
                  >
                  {{ $t('pages.register.button_login') }}
                </a>
              </span>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-col>
    </v-row>
    <p class="account-footer px-3 text-center mb-0">
      <small>&copy; 2020 - eDrop Team</small>
    </p>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
import ButtonSubmit from '@/components/button/ButtonSubmit.vue'

export default {
  name: 'Register',
  components: {
    VueRecaptcha,
    ButtonSubmit
  },
  data: () => ({
    submitting: false,
    groups: [
      { name: 'Dropship', value: 'dropship'},
      { name: 'Nhà cung cấp', value: 'merchant'}
    ],
    formData: {
      name: '',
      phone: '',
      email: '',
      password: '',
      recaptchaToken: '',
      groups: ['dropship']
    },
    googleReCaptchaSiteKey: process.env.VUE_APP_GOOGLE_RECAPTCHA_SITE_KEY,
    lang: process.env.VUE_APP_I18N_FALLBACK_LOCALE
  }),
  methods: {
    ...mapActions('auth', ['register']),
    async submit () {
      this.submitting = true
      await this.register({
        data: this.formData
      })
      this.submitting = false
    },
    onCaptchaVerified (recaptchaToken) {
      this.formData.recaptchaToken = recaptchaToken
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
      this.formData.recaptchaToken = ''
    },
    redirectLogin () {
      this.$router.push({
        name: 'login',
      })
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import "@/sass/styles/layouts/_auth.scss";
.form-action {
  padding-bottom: 70px;
}
.form-action-links {
  color: #6398ff;
}
</style>
