<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="data"
    item-key="id"
    :calculate-widths="true"
    :footer-props="{
      'items-per-page-options': itemsPerPageOptions,
      'items-per-page-text': $t('pages.common.display'),
      'items-per-page-all-text': $t('pages.common.all'),
      'page-text': `{0}-{1} ${$t('pages.common.of')} {2}`
    }"
    :items-per-page="options.itemsPerPage"
    class="pagination-table"
    :options.sync="options"
    :server-items-length="cardPagination.total"
    :no-data-text="$t('pages.common.no-data')"
    :no-results-text="$t('pages.common.no-results-data')"
    :loading-text="$t('pages.common.loading-data')"
  >
    <template v-slot:top>
      <v-sheet elevation="5" class="pa-2">
        <filter-bar
          v-model="filters"
          :advanceFilter="advanceFilter"
        />
      </v-sheet>
    </template>

    <template v-slot:item.name="{ item }">
      <span v-copy="item.name">{{ item.name }}</span>
    </template>
    <template v-slot:item.number="{ item }">
      <span v-copy="item.number">{{ item.number }}</span>
    </template>
    <template v-slot:item.bank="{ item }">
      <span v-copy="item.bank.data.name">{{ item.bank.data.name }}</span>
    </template>
    <template v-slot:item.branch="{ item }">
      <span v-copy="item.branch">{{ item.branch }}</span>
    </template>
    <template v-slot:item.main="{ item }" class="align-center">
      <v-icon v-if="item.main" color="green">check</v-icon>
    </template>
    <!-- <template v-slot:item.status="{ item }">
      <v-chip
        small
        dark
        :color="item.bank.data.active ? 'green' : 'red'"
      >
      {{ item.bank.data.active_text }}
    </v-chip>
    </template> -->
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { forEach, isEqual } from 'lodash'
import FilterBar from './FilterBar.vue'

export default {
  name: 'CardPaginateTable',
  props: [
    'advanceFilter'
  ],
  components: {
    FilterBar
  },
  data () {
    return {
      filters: {
        q: undefined,
        active: undefined
      },
      selected: [],
      options: {
        sortBy: ['created_at'],
        sortDesc: [ true ],
        itemsPerPage: 10,
        page: 1
      },
      headers: [
        { text: this.$t('pages.card.name'), value: 'name' },
        { text: this.$t('pages.card.number'), value: 'number' },
        { text: this.$t('pages.card.bank'), value: 'bank', sortable: false },
        { text: this.$t('pages.card.branch'), value: 'branch' },
        { text: this.$t('pages.card.main'), value: 'main', sortable: false },
        // { text: this.$t('pages.card.status'), value: 'status' },
        { text: this.$t('pages.common.created_at'), value: 'created_at' },
        // { text: this.$t('pages.common.action'), value: 'actions', sortable: false },
      ]
    }
  },
  computed: {
    ...mapGetters('card', ['cards', 'cardPagination']),
    ...mapGetters('table', ['itemsPerPageOptions', 'itemsPerPage']),
    data: {
      get () {
        return this.cards
      }
    },
    pagination: {
      get () {
        return this.cardPagination
      }
    }
  },
  methods: {
    ...mapActions('card', ['getByQuery']),
    buildQuery () {
      return {
        limit: this.options.itemsPerPage || undefined,
        page: this.options.page || undefined,
        sort: this.buildSort() || undefined,
        q: this.filters.q || undefined,
        active: this.filters.active,
        include: ['bank']
      }
    },
    buildSort () {
      let sort = []
      if (this.options.sortBy.length && this.options.sortDesc.length) {
        forEach(this.options.sortBy, (value, index) => {
          // ASC => 1, DESC => -1
          let type = this.options.sortDesc[index] ? -1 : 1
          sort.push(`${value}:${type}`)
        })
      }
      return sort.length ? sort.join(',') : undefined
    },
    init () {
      let sortBy = !this.$route.query.sortBy ? this.options.sortBy : Array.isArray(this.$route.query.sortBy) ? this.$route.query.sortBy : [this.$route.query.sortBy]
      let sortDesc = !this.$route.query.sortDesc ? this.options.sortDesc : Array.isArray(this.$route.query.sortDesc) ? this.$route.query.sortDesc : [!!this.$route.query.sortDesc]

      this.options = {
        sortBy: sortBy,
        sortDesc: sortDesc,
        itemsPerPage: parseInt(this.$route.query.itemsPerPage || this.itemsPerPage),
        page: parseInt(this.$route.query.page || 1)
      }

      this.filters = this.parseFilter()
    },
    parseFilter () {
      return {
        q: this.$route.query.q,
        active: typeof(this.$route.query.active) !== 'undefined' ? parseInt(this.$route.query.active) : undefined
      }
    },
    fetchData () {
      this.getByQuery({
        query: this.buildQuery(),
        cb: () => {}
      })
    }
  },
  created () {
    this.init()

    this.$on('reload', () => {
      this.fetchData()
    })
  },
  watch: {
    options: {
      handler () {
        this.fetchData()
      },
      deep: true,
    },
    filters: {
      handler (value) {
        if (!isEqual(value, this.parseFilter())) {
          this.options.page = 1
          this.fetchData()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
  .text-start:nth-child(6) {
    text-align: center !important;
  }
</style>
