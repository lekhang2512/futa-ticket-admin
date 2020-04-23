<template>
  <ValidationObserver v-slot="{ invalid, passes }">
    <v-card>
      <v-toolbar dense>
        <v-toolbar-title>{{$t('title.change_password')}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <close-button @click="$emit('close')"></close-button>
      </v-toolbar>

      <v-card-text>
        <v-form @submit.prevent="passes(submit)" @keyup.native.enter="passes(submit)">
          <ValidationProvider
            :name="$t('pages.profile.input_current_password')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="input_current_password"
              :label="$t('pages.profile.input_current_password')"
              name="current_password"
              type="password"
              v-model="formChangePassword.current_password"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>

          <ValidationProvider
            :name="$t('pages.profile.input_password')"
            rules="required|confirmed:password_confirmation"
            v-slot="{ errors }"
          >
            <v-text-field
              :label="$t('pages.profile.input_password')"
              name="password"
              type="password"
              v-model="formChangePassword.password"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>

          <ValidationProvider
            :name="$t('pages.profile.input_password_confirmation')"
            vid="password_confirmation"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              :label="$t('pages.profile.input_password_confirmation')"
              name="password_confirmation"
              type="password"
              v-model="formChangePassword.password_confirmation"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <button-submit
          small
          :text="$t('pages.profile.button_change_password')"
          :disabled="invalid"
          :dark="!invalid"
          @click="passes(submit)"/>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ChangePassword',
  data () {
    return {
      formChangePassword: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['changePassword', 'logout']),
    submit () {
      this.changePassword({ data: this.formChangePassword, cb: this.succes })
      this.logout()
    },
    success () {
    }
  },
  mounted () {
    this.$refs.input_current_password.focus()
  }
}
</script>
