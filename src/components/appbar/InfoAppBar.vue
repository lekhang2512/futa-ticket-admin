<template>
  <v-toolbar-items>
    <div class="text-center" v-if="$vuetify.breakpoint.xsOnly">
      <v-btn
        color="primary"
        v-if="access('ticket', 'create')"
        @click="$router.push({ name: 'ticket-create' }).catch(err => { err })"
        >
        Tạo Ticket
      </v-btn>
    </div>

    <!-- <div class="v-btn__content app-bar-text ml-1">
      <span class="font-weight-bold">¥ {{$t('pages.app.rate_today')}}</span>: 3,390
    </div>
    <div class="v-btn__content app-bar-text">
      <v-icon>mdi-google-chrome</v-icon>
      <a class="app-bar-text-link ml-1"> {{$t('pages.app.link_extension_chorme')}}</a>
    </div> -->
    <!-- <div class="v-btn__content app-bar-text">
      <v-icon>mdi-wallet-outlines</v-icon>
      <span class="ml-1">{{$t('pages.app.wallet_account')}}:</span>
      <span class="app-bar-text-money ml-1" v-if="user.debit">
        <span v-if="walletsLoading">
          <v-icon>mdil-refresh mdil-spin</v-icon>
        </span>
        <span v-else> {{ balances }}</span>
      </span>
      <a class="app-bar-text-link ml-1" @click="showDialogPayIn()"> ({{$t('pages.app.pay_in')}})</a>
    </div> -->
    <!-- <dialog-pay-in v-model="dialogPayIn" /> -->
  </v-toolbar-items>
</template>
<script>
import { mapGetters } from 'vuex'
// import DialogPayIn from '../dialog/DialogPayIn'
export default {
  name: 'InfoAppBar',
  computed: {
    ...mapGetters('auth', ['user']),
  },
  components: {
    // DialogPayIn
  },
  data () {
    return {
      dialogPayIn: false,
      balances: 0
    }
  },
  mounted () {
    // this.fetchBalance()
  },
  methods: {
    showDialogPayIn () {
      this.dialogPayIn = true
    }
  }
}
</script>
<style lang="css" scoped>
  .app-bar-text {
    font-size: 13px;
    margin-right: 40px;
  }
  .app-bar-text-money {
    color: #f5cb37;
  }
  .app-bar-text-link {
    text-decoration: underline;
  }
  @media (max-width: 992px) {
    .app-bar-text-link {
      color: #330392 !important;
    }
    .app-bar-text {
      font-size: 13px;
      margin-right: 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
