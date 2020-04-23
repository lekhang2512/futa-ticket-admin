<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="range"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        hide-details
        v-model="valueText"
        prepend-inner-icon="mdil-calendar"
        :label="label"
        dense
        readonly
        v-on="on"
        clearable
        @click:clear="onClear"
        background-color="#F2F2F2"
        height="40"
        solo
        flat
      ></v-text-field>
    </template>
    <v-date-picker
      :show-current="true"
      v-model="range"
      range
      no-title
    >
      <v-btn
        text
        color="primary"
        @click="() => {
          $refs.menu.save([])
          $emit('input', [])
        }"
      >
        {{$t('actions.clear')}}
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="() => {
        $refs.menu.save(range)
        $emit('input', range)
        }"
      >
        {{$t('actions.ok')}}
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'FilterDateRange',
  props: ['value', 'label'],
  data () {
    return {
      range: []
    }
  },
  computed: {
    valueText: {
      get () {
        return this.range.join(' ~ ')
      },
      set () {

      }

    }
  },
  methods: {
    onClear () {
      this.range = []
      this.$refs.menu.save([])
      this.$emit('input', [])
    }
  },
  mounted () {
    this.range = this.value ? this.value.slice(0) : []
  }
}
</script>
