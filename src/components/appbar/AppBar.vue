<template>
  <fragment>
    <v-app-bar-nav-icon @click.stop="changeDrawer()" />
    <v-toolbar-title class="">
      <span class="title font-weight-bold">E</span>
      <span class="title font-weight-bold">-Dropship</span>
    </v-toolbar-title>
    <!-- <cart-app-bar /> -->
    <v-spacer />
    <v-btn
      small
      color="primary"
      @click="$router.push({ name: 'ticket-create' }).catch(err => { err })"
      >
      Tạo Ticket
    </v-btn>
    <info-app-bar class="d-none d-md-flex" />
    <!-- <notify-app-bar /> -->
    <account-app-bar />
  </fragment>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import NotifyAppBar from './NotifyAppBar.vue'
import InfoAppBar from './InfoAppBar.vue'
import AccountAppBar from './AccountAppBar.vue'
// import CartAppBar from './CartAppBar.vue'
export default {
  name: 'AppBar',
  computed: {
    ...mapGetters('app', ['drawer', 'miniDrawer']),
    drawerModel: {
      get () {
        return this.drawer
      },
      set (value) {
        this.setDrawer(value)
      }
    },
    drawerMiniModel: {
      get () {
        return this.miniDrawer
      },
      set (value) {
        this.setMiniDrawer(value)
      }
    }
  },
  components: {
    // NotifyAppBar,
    InfoAppBar,
    AccountAppBar,
    // CartAppBar
  },
  methods: {
    ...mapActions('app', ['setDrawer', 'setMiniDrawer']),
    changeDrawer () {
      if (!this.$vuetify.breakpoint.lgAndUp) {
        this.drawerModel = !this.drawerModel
      } else {
        this.drawerMiniModel = !this.drawerMiniModel
      }
    }
  }
}
</script>
