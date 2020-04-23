<template>
  <v-container
    class="account d-flex flex-column justify-space-between"
    fluid
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
        <v-card flat class="py-5 form">
          <div
            class="d-flex justify-center logo"
            >
            <img src="../assets/logo.png" width="64" height="64" alt="Tiểu Thần Tài">
          </div>
          <v-toolbar
            flat
            >
            <v-spacer></v-spacer>
            <v-toolbar-title class="form-title">{{$t('title.verify_email')}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="pb-0">
            {{$t('pages.app.verify_email_message')}}
          </v-card-text>
          <v-card-actions class="form-action d-flex flex-column">
            <v-btn height="40" depressed :loading="submitting" color="primary" @click="submitVerifyEmail()">{{$t('actions.verify_email')}}</v-btn>
            <v-btn class="mt-3" height="40" depressed @click.prevent.stop="logout">{{$t('pages.app.logout')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <p class="account-footer px-3 text-center mb-2">
      {{ $t('pages.app.footer_start') }} <a class="account-footer-center px-1">{{ $t('pages.app.goship_group') }}</a> {{ $t('pages.app.footer_end') }}
    </p>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'RegisterSuccess',
    data: () => ({
      submitting: false
    }),
    components: {
    },
    methods: {
      ...mapActions('auth', ['logout']),
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
<style lang="css" scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
  .account {
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(../assets/images/ocean-freight-image.jpg) no-repeat center center fixed;
    background-size: cover;
    color: #000000;
    height: 100%;
  }
  .goship-group {
    font-size: 18px;
  }
  .account-heading {
    height: 54px;
    background: #FFFFFF;
    width: 100%;
    font-size: 14px;
    padding: 0 35px;
  }
  .logo {
  }
  .form {
    width: 600px;
  }
  .form-title {
    font-family: 'Roboto Slab', serif;
    font-weight: bold;
    font-size: 24px;
  }
  .form-content {
    padding: 0 30px;
    font-size: 14px;
  }
  .form-content-email {
    text-decoration: underline;
  }
  .form-input-label {
    font-size: 14px;
  }
  .form-action {
    padding: 18px 40px 70px 40px;
    width: 100%;
  }
  .form-action-link {
    color: #6398FF;
  }
  .account-footer {
    font-size: 12px;
    color: #FFFFFF;
    width: 100%;
  }
  .account-footer-center {
    text-decoration: underline;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    .form {
      width: 100%;
    }
  }
  @media (min-width: 1600px) {
    .account {
      height: 900px;
    }
  }
</style>
