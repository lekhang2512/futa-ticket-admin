<template>
  <v-app class="dropship-guest-app">
    <snackbar />
    <v-content class="pa-0">
      <progress-bar />
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'
import ProgressBar from '@/components/ProgressBar.vue'
export default {
  components: {
    Snackbar,
    ProgressBar
  }
}
</script>
