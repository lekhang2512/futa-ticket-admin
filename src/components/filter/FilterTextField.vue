<template>
  <v-text-field
    autocomplete='off'
    hide-details
    outlined
    dense
    :label="label"
    v-model="query"
    :append-icon="icon || 'mdi-table-search'"
    @input="commit"
    clearable
  />
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'FilterTextField',
  props: ['value', 'label', 'icon'],
  data () {
    return {
      query: ''
    }
  },
  methods: {
    commit: debounce(function () {
      this.$emit('input', this.query)
    }, 800)
  },
  mounted () {
    this.query = this.value ? (' ' + this.value).slice(1) : ''
  }
}
</script>
