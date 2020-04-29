<template>
  <fragment>
    <edit-button
      @click="actionEdit(item)"
    />
    <duplicate-button
      @click="actionDuplicate(item)"
    />
    <delete-button
      :message="`${$t('confirms.delete')} ${$t('title.source').toLowerCase()}: ${item.name}`"
      @click="actionDelete(item)"
    />
  </fragment>
</template>

<script>
  import { SET_TICKET_TYPE_DETAIL } from '@/store/mutation-types'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'SourceActionBar',
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
      ...mapActions('source', ['delete']),
      ...mapMutations('source', [SET_TICKET_TYPE_DETAIL]),
      parseListParams () {
        if (this.isListMode) {
          return JSON.stringify(this.$route.query)
        } else {
          return this.$route.query.list || undefined
        }
      },
      actionEdit(item) {
        this[SET_TICKET_TYPE_DETAIL](item)
        this.$router.push({name: 'source-update', params: {id: item.id}, query: { list: this.parseListParams()}})
      },
      actionDuplicate(item) {
        this[SET_TICKET_TYPE_DETAIL](item)
        this.$router.push({name: 'source-duplicate', params: {id: item.id}, query: { list: this.parseListParams()}})
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
