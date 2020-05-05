<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
         <v-card>
          <v-toolbar dense>
            <back-button @click="() => { $router.back() }" />
            <v-toolbar-title>{{$t('title.ticket_type_update')}}: {{ ticketType.name }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <Form
              ref="form"
              type="update"
              @submit="submit"
              :btn-loading="btnLoading"
            />
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import Form from './Form.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TicketTypeUpdate',
  components: {
    Form
  },
  data () {
    return {
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters('ticketType', ['ticketType'])
  },
  methods: {
    ...mapActions('ticketType', ['update', 'getDetail']),
    async submit (data) {
      this.btnLoading = true
      await this.update({
        id: this.ticketType.id,
        data: data,
        cb: () => {
          this.$refs.form.$emit('init', {})
          this.$router.push({'name': 'ticket-type', query: this.parseListParrams() })
        }
      })
      this.btnLoading = false
    },
    parseListParrams () {
      try {
        let params = JSON.parse(this.$route.query.list)
        params.rf = 1
        return params
      } catch(e) {
        return {rf: 1}
      }
    },
    initForm () {
      let data = Object.assign({}, this.ticketType)
      this.$refs.form.$emit('init', data)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.ticketType.id) {
        vm.getDetail({
          id: vm.$route.params.id,
          query: { },
          cb: () => {
            vm.initForm()
          }
        })
      } else {
        vm.initForm()
      }
    })
  }
}
</script>
