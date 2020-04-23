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
      class="px-3"
      >
      <v-col
        cols="12"
        class="d-flex flex-column justify-center align-center"
        >
        <ValidationObserver v-slot="{ invalid, passes }" class="form">
          <v-card flat class="py-5">
            <v-toolbar
              flat
              >
              <v-spacer></v-spacer>
              <v-toolbar-title class="form-title">{{$t('title.success')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="form-content">
              <p class="mb-0 text-center"><span>{{ message }}</span>.</p>
            </v-card-text>
            <v-card-actions class="form-action d-flex flex-column">
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
    <p class="account-footer px-3 text-center mb-0">
      <small>&copy; 2020 - eDrop Team</small>
    </p>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'RegisterSuccess',
  data: () => ({
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error mollitia, ad! Ratione quam officia doloremque obcaecati libero nesciunt, velit. Ut ipsa, asperiores unde iste vero neque quam ducimus cum quis?'
  }),
  computed: {
    ...mapGetters('auth', ['messageSuccess']),
  },
  methods: {
    redirectLogin () {
      this.$router.push({
        name: 'login',
      })
    }
  },
  mounted () {
    // this.message = this.messageSuccess
  }
}
</script>
<style lang="scss" scoped>
@import "@/sass/styles/layouts/_auth.scss";
  .form {
    width: 600px;
  }
</style>
