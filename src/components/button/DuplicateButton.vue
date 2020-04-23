<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="disabled" small icon v-on="on" @click="$emit('click')">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
    </template>
    <span>{{$t('actions.duplicate')}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'DuplicateButton',
  props: [
    'disabled'
  ]
}
</script>
