<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="disabled" small icon v-on="on" @click="$emit('click')" class="mr-2">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>{{$t('actions.create')}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'CreateButton',
  props: [
    'disabled'
  ]
}
</script>
