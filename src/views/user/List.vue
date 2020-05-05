<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-toolbar dense>
          <v-toolbar-title>Danh sách tài khoản</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <create-button
            v-if="access()"
            @click="$router.push({name: 'user-create', query: { list: JSON.stringify($route.query) }})"
          />
        </v-toolbar>
          <v-card-text>
            <paginate-table ref="table" />
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import PaginateTable from './PaginateTable.vue'
export default {
  name: 'UserList',
  data () {
    return {
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
