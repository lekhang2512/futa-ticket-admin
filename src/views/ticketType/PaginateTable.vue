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
    :server-items-length="ticketTypePagination.total"
    :no-data-text="$t('pages.common.no-data')"
    :no-results-text="$t('pages.common.no-results-data')"
    :loading-text="$t('pages.common.loading-data')"
  >
    <template v-slot:top>
      <filter-bar
        v-model="filters"
      />
    </template>

    <template v-slot:item.index="{ item }">
      <span> {{ data.map(function(x) {return x.id }).indexOf(item.id) + 1}}</span>
    </template>
    <template v-slot:item.name="{ item }">
      <span>{{ item.name }}</span>
      <!-- <a @click="showDetail()">{{ item.name }}</a> -->
    </template>
    <template v-slot:item.description="{ item }">
      <span>{{ item.description }}</span>
    </template>
    <template v-slot:item.type_txt="{ item }">
      <span>{{ item.type_txt }}</span>
    </template>
    <template v-slot:item.role="{ item }">
      <span v-for="(role, key) in item.roles['data']" :key="key">
        <v-chip outlined> {{ role.name }} </v-chip>
      </span>
    </template>
    <template v-slot:item.created_at="{ item }">
      <span>{{ item.created_at }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <action-bar @success="fetchData" :item="item" />
    </template>

  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { forEach, isEqual } from 'lodash'
import FilterBar from './FilterBar.vue'
import ActionBar from './ActionBar.vue'

export default {
  name: 'TicketTypePaginateTable',
  props: [],
  components: {
    ActionBar,
    FilterBar
  },
  data () {
    return {
      filters: {
        q: undefined
      },
      selected: [],
      options: {
        sortBy: ['created_at'],
        sortDesc: [ true ],
        itemsPerPage: 10,
        page: 1
      },
      headers: [
        { text: '#', value: 'index', sortable: false },
        { text: this.$t('pages.ticket_type.name'), value: 'name', sortable: false },
        { text: this.$t('pages.ticket_type.description'), value: 'description', sortable: false },
        { text: this.$t('pages.ticket_type.type'), value: 'type_txt', sortable: false },
        { text: this.$t('pages.ticket_type.assignee'), value: 'role', sortable: false },
        { text: this.$t('pages.common.created_at'), value: 'created_at', sortable: false },
        { text: this.$t('actions.label'), value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('ticketType', ['ticketTypes', 'ticketTypePagination']),
    ...mapGetters('table', ['itemsPerPageOptions', 'itemsPerPage']),
    data: {
      get () {
        return this.ticketTypes
      }
    },
    pagination: {
      get () {
        return this.ticketTypePagination
      }
    }
  },
  methods: {
    ...mapActions('ticketType', ['getByQuery']),
    showDetail () {
      console.log('showDetail')
    },
    buildQuery () {
      return {
        include: ['roles'],
        limit: this.options.itemsPerPage || undefined,
        page: this.options.page || undefined,
        q: this.filters.q || undefined
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
        q: this.$route.query.q
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
