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
    <v-col cols="12" md="9">
      <v-chip
        v-model="value.status"
        v-for="(item, index) in statuses"
        :key="index"
        class="ma-2"
        dark
        label
        outlined
        :color="helpers.statuses_color[item.code]"
        @click="$emit('filterStatus', item.code)"
        >
        {{ item.name }}
      </v-chip>
    </v-col>
  </v-row>
</template>
<script>
import FilterTextField from '@/components/filter/FilterTextField.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'TicketFilterBar',
  props: ['value'],
  components: {
    FilterTextField
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('ticket', ['helpers', 'statuses'])
  }
}
</script>
