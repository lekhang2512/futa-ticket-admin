<template>
  <v-container fluid class="pa-6">
    <v-row dense>
      <v-col cols="12">
        <p class="title mb-4 d-flex align-center flex-wrap">
          {{$t('title.card')}}
          <v-spacer></v-spacer>
          <create-button v-if="access('id', 'user', 'create')" @click="$router.push({ name: 'card-create' })"/>
        </p>

         <v-card>
          <v-card-text>
            <paginate-table
              ref="table"
              :advanceFilter="advanceFilter"
            />
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import PaginateTable from './PaginateTable.vue'
export default {
  name: 'CardList',
  data () {
    return {
      advanceFilter: false,
      advanceFilterList: ['active', 'vetifyRange']
    }
  },
  components: {
    PaginateTable
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.table.$emit('reload')
      let query = Object.assign({}, vm.$router.query, {rf: undefined})
      vm.$router.replace({ path: vm.$route.path, query: query })
      vm.advanceFilter = vm.checkAdvanceFilter()
    })
  },
  methods: {
    checkAdvanceFilter () {
      let queryString = Object.keys(this.$route.query)
      return !!this.arrayIntersect(queryString, this.advanceFilterList).length
    }
  }
}
</script>
