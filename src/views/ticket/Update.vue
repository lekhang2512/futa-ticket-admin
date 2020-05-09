<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
         <v-card>
          <v-toolbar dense>
            <back-button @click="() => { $router.back() }" />
            <v-toolbar-title>{{$t('title.ticket_type_update')}}: {{ ticket.name }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <Form
              ref="form"
              typeForm="update"
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
  name: 'TicketUpdate',
  components: {
    Form
  },
  data () {
    return {
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters('ticket', ['ticket'])
  },
  methods: {
    ...mapActions('ticket', ['update', 'getDetail']),
    async submit (data) {
      this.btnLoading = true
      await this.update({
        id: this.ticket.id,
        data: data,
        cb: () => {
          this.$refs.form.$emit('init', {})
          this.$router.push({'name': 'ticket', query: this.parseListParrams() })
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
    async initForm () {
      let data = Object.assign({}, this.ticket)
      console.log('data: ', data)
      // data.roles = this.ticket.roles['data'].map((item) => { return item.id })
      this.$refs.form.$emit('init', data)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.ticket.id) {
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
