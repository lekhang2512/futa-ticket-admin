<template>
  <v-text-field
    hide-details
    dense
    :label="label"
    v-model="query"
    :prepend-inner-icon="icon || 'mdil-magnify'"
    @input="commit"
    clearable
    background-color="#F2F2F2"
    height="40"
    solo
    flat
  ></v-text-field>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'FilterDateRange',
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
