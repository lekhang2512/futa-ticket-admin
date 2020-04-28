<template>
  <v-row dense>
    <v-col cols="12" md="3">
      <filter-text-field
        v-model="value.q"
        :label="$t('pages.ticket.filter_query')"
        @input="$emit('input', value)"
        icon="mdi-table-search"
      />
    </v-col>
    <v-col cols="12" md="3">
      <v-autocomplete
        hide-details
        v-model="value.status"
        :items="[{name: 'Kích hoạt', code: 1}, {name: 'Đã khoá', code: 0}]"
        item-text="name"
        item-value="code"
        :label="$t('pages.ticket.filter_status')"
        @input="$emit('input', value)"
        clearable
        outlined
        dense
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>
<script>
import FilterTextField from '@/components/filter/FilterTextField.vue'
export default {
  name: 'TicketFilterBar',
  props: ['value'],
  components: {
    FilterTextField
  }
}
</script>
