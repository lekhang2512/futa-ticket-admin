<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="disabled" small icon v-on="on" @click="$emit('click')">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <span>{{$t('actions.other')}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'OtherButton',
  props: [
    'disabled'
  ]
}
</script>
