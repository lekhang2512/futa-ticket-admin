<template>
  <v-btn class="caption text-transform-unset" @click="$emit('click')" depressed height="27" width="108">
    {{$t('actions.require_supported')}}
  </v-btn>
</template>

<script>
  export default {

    name: 'ButtonRequireSupported',

    data () {
      return {

      }
    }
  }
</script>

<style lang="css" scoped>
</style>
