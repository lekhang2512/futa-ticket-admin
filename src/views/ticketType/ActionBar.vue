<template>
  <fragment>
    <edit-button
      v-if="access('ticket_type', 'update')"
      @click="actionEdit(item)"
    />
    <duplicate-button
      v-if="access('ticket_type', 'create')"
      @click="actionDuplicate(item)"
    />
    <delete-button
      v-if="access('ticket_type', 'delete')"
      :message="`${$t('confirms.delete')} ${$t('pages.ticket_type.ticket_type').toLowerCase()}: ${item.name}?`"
      @click="actionDelete(item)"
    />
  </fragment>
</template>

<script>
  import { SET_TICKET_TYPE_DETAIL } from '@/store/mutation-types'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'TicketTypeActionBar',
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
      ...mapActions('ticketType', ['delete']),
      ...mapMutations('ticketType', [SET_TICKET_TYPE_DETAIL]),
      parseListParams () {
        if (this.isListMode) {
          return JSON.stringify(this.$route.query)
        } else {
          return this.$route.query.list || undefined
        }
      },
      actionEdit(item) {
        this[SET_TICKET_TYPE_DETAIL](item)
        this.$router.push({name: 'ticket-type-update', params: {id: item.id}, query: { list: this.parseListParams()}})
      },
      actionDuplicate(item) {
        this[SET_TICKET_TYPE_DETAIL](item)
        this.$router.push({name: 'ticket-type-duplicate', params: {id: item.id}, query: { list: this.parseListParams()}})
      },
      async actionDelete(item) {
        await this.delete({
          id: item.id,
          cb: () => {
            this.$emit('success', 'delete')
          }
        })
      }
    }
  }
</script>
