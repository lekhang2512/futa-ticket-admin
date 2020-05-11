<template>
  <fragment>
    <edit-button
      v-if="access('ticket', 'update') && item.permissions.update"
      @click="actionUpdate(item)"
    />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="access('ticket', 'in_progress') && item.permissions.can_in_progress && item.status == 1"
          small icon v-on="on" @click="actionInProgress(item)">
          <v-icon color="orange">near_me</v-icon>
        </v-btn>
      </template>
      <span>{{$t('actions.in_progress')}}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="access('ticket', 'resolved') && item.permissions.can_resolved && item.status == 10"
          small icon v-on="on" @click="actionResolved(item)">
          <v-icon color="green">done</v-icon>
        </v-btn>
      </template>
      <span>{{$t('actions.done')}}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-if="access('ticket', 'closed') && item.permissions.can_closed && item.status == 20"
          small icon v-on="on" @click="actionClose(item)">
          <v-icon color="#000">clear</v-icon>
        </v-btn>
      </template>
      <span>{{$t('actions.clear')}}</span>
    </v-tooltip>

    <delete-button
      v-if="access('ticket', 'delete') && item.status == 1"
      :message="`${$t('confirms.delete')} ${$t('title.ticket').toLowerCase()}: ${item.name} ?`"
      @click="actionDelete(item)"
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
      ...mapActions('ticket', ['delete', 'inProgress', 'resolved', 'close']),
      ...mapMutations('ticket', [SET_TICKET_DETAIL]),
      parseListParams () {
        if (this.isListMode) {
          return JSON.stringify(this.$route.query)
        } else {
          return this.$route.query.list || undefined
        }
      },
      actionUpdate(item) {
        this[SET_TICKET_DETAIL](item)
        this.$router.push({name: 'ticket-update', params: {id: item.id}, query: { list: this.parseListParams()}})
      },
      async actionDelete(item) {
        await this.delete({
          id: item.id,
          cb: () => {
            this.$emit('success', 'close')
          }
        })
      },
      async actionClose(item) {
        await this.close({
          id: item.id,
          cb: () => {
            this.$emit('success', 'close')
          }
        })
      },
      async actionInProgress(item) {
        await this.inProgress({
          id: item.id,
          cb: () => {
            this.$emit('success', 'close')
          }
        })
      },
      async actionResolved(item) {
        await this.resolved({
          id: item.id,
          cb: () => {
            this.$emit('success', 'close')
          }
        })
      },
    }
  }
</script>
