<template>
  <fragment>
    <edit-button
      v-if="access('ticket', 'update') && item.permissions.update"
      @click="actionEdit(item)"
    />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="access('ticket', 'in_progress') && item.permissions.can_in_progress"
          small icon v-on="on" @click="actionEdit(item)">
          <v-icon color="orange">near_me</v-icon>
        </v-btn>
      </template>
      <span>{{$t('actions.in_progress')}}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="access('ticket', 'resolved') && item.permissions.can_resolved"
          small icon v-on="on" @click="actionEdit(item)">
          <v-icon color="green">done</v-icon>
        </v-btn>
      </template>
      <span>{{$t('actions.done')}}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="access('ticket', 'closed') && item.permissions.can_closed"
          small icon v-on="on" @click="actionClose(item)">
          <v-icon color="#000">clear</v-icon>
        </v-btn>
      </template>
      <span>{{$t('actions.clear')}}</span>
    </v-tooltip>

    <delete-button
      v-if="access('ticket', 'delete')"
      :message="`${$t('confirms.delete')} ${$t('title.ticket_type').toLowerCase()}: ${item.name}`"
    />
  </fragment>
</template>

<script>
  import { SET_TICKET_DETAIL } from '@/store/mutation-types'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'TicketActionBar',
    props: {
      item: {
        required: true
      },
      mode: {
        type: String,
        default: 'list'
      }
    },
    computed: {
      isListMode () {
        return (this.mode || 'list') === 'list'
      }
    },
    methods: {
      ...mapActions('ticket', ['close']),
      ...mapMutations('ticket', [SET_TICKET_DETAIL]),
      parseListParams () {
        if (this.isListMode) {
          return JSON.stringify(this.$route.query)
        } else {
          return this.$route.query.list || undefined
        }
      },
      actionEdit(item) {
        this[SET_TICKET_DETAIL](item)
        this.$router.push({name: 'ticket-update', params: {id: item.id}, query: { list: this.parseListParams()}})
      },
      async actionClose(item) {
        await this.close({
          id: item.id,
          cb: () => {
            this.$emit('success', 'close')
          }
        })
      }
    }
  }
</script>
