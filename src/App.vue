<template>
  <section class="dropship-app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  created () {
    if (this.$osmode.isDarkMode()) {
      this.$vuetify.theme.dark = true
    }
  }
}
</script>
