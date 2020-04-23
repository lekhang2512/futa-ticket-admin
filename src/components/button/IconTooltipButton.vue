<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon small @click="$emit('click')">
        <v-icon>{{icon}}</v-icon>
      </v-btn>
    </template>
    <span>{{tooltip}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'BackButton',
  props: [
    'icon', 'tooltip'
  ]
}
</script>
