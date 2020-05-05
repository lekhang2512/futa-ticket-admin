<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="disabled" small icon v-on="on" @click="$emit('click')">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </template>
    <span>{{ text ? text : $t('actions.edit') }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'EditButton',
  props: {
    text: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  }
}
</script>
