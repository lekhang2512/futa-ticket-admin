<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon small @click="$emit('click')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <span>{{$t('actions.close')}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'CloseButton'
}
</script>
