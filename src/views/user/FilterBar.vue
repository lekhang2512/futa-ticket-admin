<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <filter-text-field
        v-model="value.q"
        :label="$t('pages.user.filter_query')"
        @input="$emit('input', value)"
        icon="mdi-table-search"
      />
    </v-col>
  </v-row>
</template>
<script>
import FilterTextField from '@/components/filter/FilterTextField.vue'

export default {
  name: 'UserFilterBar',
  props: ['value'],
  components: {
    FilterTextField
  },
  data () {
    return {

    }
  }
}
</script>
