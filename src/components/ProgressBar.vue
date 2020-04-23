<template>
  <v-progress-linear
    :active="loading"
    :indeterminate="true"
    :height="2"
    color="green"
    :absolute="true"
  ></v-progress-linear>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProgressBar',
  computed: {
    ...mapGetters('app', ['loading']),
  }
}
</script>
