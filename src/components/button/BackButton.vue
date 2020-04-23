<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon small @click="$emit('click')">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
    </template>
    <span>{{$t('actions.back')}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'BackButton'
}
</script>
