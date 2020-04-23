<template>
  <v-btn
    height="40"
    depressed
    :block="block"
    :disabled="disabled"
    :dark="!disabled"
    :loading="loading"
    :small="small"
    @click="$emit('click')"
    color="primary"
    >
      {{ text }}
  </v-btn>
</template>

<script>
  export default {
    name: 'ButtonSubmit',
    props: {
      text: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: () => { true }
      },
      loading: {
        type: Boolean
      },
      block: {
        type: Boolean,
        default: () => { false }
      },
      small: {
        type: Boolean,
        default: () => { false }
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
