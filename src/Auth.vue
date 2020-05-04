<template>
  <v-app class="dropship-auth-app">
    <v-navigation-drawer
      v-if="!$vuetify.breakpoint.lgAndUp"
      ref="nav"
      v-model="drawerModel"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      >
      <drawer-bar />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-else
      ref="nav"
      :v-model="true"
      :mini-variant="drawerMiniModel"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      >
      <drawer-bar />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      height="50"
      flat
      >
      <app-bar />
    </v-app-bar>

    <v-content>
      <snackbar />
      <progress-bar />
      <transition>
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import DrawerBar from '@/components/DrawerBar.vue'
import AppBar from '@/components/appbar/AppBar.vue'
import Snackbar from '@/components/Snackbar.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    DrawerBar,
    AppBar,
    Snackbar,
    ProgressBar
  },
  data () {
    return {
    }
  },
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
  created () {
    if (this.$route.query.platform) {
      this.createConnect()
    }
  },
  methods: {
    ...mapActions('app', ['setDrawer', 'setMiniDrawer']),
    ...mapActions('marketPlace', ['create']),
    createConnect () {
      this.create({
        data: {
          type: this.$route.query.platform,
          seller_id: this.$route.query.shop_id && this.$route.query.shop_id
        },
        cb: () => {
          this.$router.replace({ query: {} })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/sass/styles/layouts/_navigation-drawer.scss"
</style>
