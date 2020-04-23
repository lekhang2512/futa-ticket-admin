<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon small @click="$emit('input', !value)">
        <v-icon v-if="value">mdi-filter-remove-outline</v-icon>
        <v-icon v-else>mdi-filter-outline</v-icon>
      </v-btn>
    </template>
    <span v-if="value">{{$t('actions.advance_filter_hide')}}</span>
    <span v-else>{{$t('actions.advance_filter_show')}}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'AdvanceFilterButton',
  props: [
    'value'
  ]
}
</script>
