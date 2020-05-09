<template>
  <ValidationObserver v-slot="{ invalid, passes }" ref="observer">
    <v-form @submit.prevent="passes(submit)">
      <v-row dense>
        <v-col cols="12" sm="4">
          <ValidationProvider
            :name="$t('pages.ticket.name')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              :label="$t('pages.ticket.name')"
              name="name"
              v-model="formData.name"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>
        </v-col>

        <v-col cols="12" sm="4">
          <ValidationProvider
            :name="$t('pages.ticket.issue_type')"
            rules="required"
            v-slot="{ errors }"
            >
            <v-autocomplete
              name="type_id"
              v-model="formData.type_id"
              :items="ticketTypes"
              item-text="name"
              item-value="id"
              :label="$t('pages.ticket.issue_type')"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              :loading="false"
              :filter="filterType"
              clearable
              clear-icon="close"
              class="input-required"
              >
              <template slot="selection" slot-scope="data">
                {{ data.item.name }}
              </template>
            </v-autocomplete>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" sm="4">
          <v-select
            v-model="formData.priority"
            :items="priorities"
            item-text="name"
            item-value="code"
            :label="$t('pages.ticket.priority')"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <span>{{ $t('pages.ticket.description') }}</span>
          <tiny :id="`editor`" v-model="formData.description"></tiny>
        </v-col>

        <v-col cols="12" sm="6">
          <v-datetime-picker
            v-model="datetime"
            :text-field-props="textFieldProps"
            date-format="dd-MM-yyyy"
            :clearText="$t('actions.cancel')"
            :okText="$t('actions.apply')"
            :label="$t('pages.ticket.due_date')"
            />
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            name="source_id"
            v-model="formData.source_id"
            :items="sources"
            item-text="name"
            item-value="id"
            :label="$t('pages.ticket.source')"
            :loading="false"
            :filter="filterSource"
            clearable
            clear-icon="close"
            class="input-required"
            >
            <template slot="selection" slot-scope="data">
              {{ data.item.name }}
            </template>
          </v-autocomplete>
        </v-col>

        <!-- <v-col cols="12">
          <v-combobox
            multiple
            v-model="formData.tags"
            :label="$t('pages.ticket.tag')"
            append-icon
            chips
            deletable-chips
            class="tag-input"
           >
          </v-combobox>
        </v-col> -->

        <v-col cols="12">
          <div class="d-flex justify-end">
<!--             <button-submit
              small
              :text="$t('pages.common.button_create')"
              :disabled="invalid"
              :dark="!invalid"
              :loading="btnLoading"
              @click="passes(submit)"/> -->

            <v-btn
              small
              :disabled="invalid"
              :loading="btnLoading"
              color="primary"
              @click="passes(submit)"
              >
              {{type ? $t('actions.create') : $t('actions.update')}}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { vnFilter } from '@/utils'
import Tiny from '@/components/Editor.vue'
import { format, parse } from 'date-fns'
// import { parseISO } from 'date-fns'
import { pick } from 'lodash'

const initFrom = {
  type_id: '',
  name: '',
  description: '',
  priority: '',
  due_date: '',
  tags: [],
  source_id: ''
}

export default {
  name: 'TicketForm',
  components: {
    Tiny
  },
  props: [
    'type', 'btnLoading'
  ],
  data () {
    return {
      formData: Object.assign({}, initFrom),
      assignees: ['AnhBeta'],
      menu: false,
      search: "",
      datetime: '',
      textFieldProps: {
        appendIcon: 'event'
      }
    }
  },
  computed: {
    ...mapGetters('ticketType', ['ticketTypes']),
    ...mapGetters('ticket', ['priorities']),
    ...mapGetters('source', ['sources']),
  },
  methods: {
    ...mapActions('ticket', ['getHelpers']),
    ...mapActions('ticketType', ['getByQuery']),
    ...mapActions('source', ['getAll']),
    submit () {
      this.$emit('submit', this.formData)
    },
    fetchType () {
      if (!this.ticketTypes.length) {
        this.getByQuery({
          query: {
            limit: -1,
            include: 'roles'
          }
        })
      }
    },
    fetchHelpers () {
      if (!this.priorities.length) {
        this.getHelpers({})
      }
    },
    fetchSource () {
      if (!this.sources.length) {
        this.getAll({
          query: { limit: -1 }
        })
      }
    },
    filterType (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    },
    filterSource (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    }
  },
  created () {
    this.$on('init', (data) => {
      if (data) {
        let allowData = pick(data, 'name', 'type_id', 'description', 'priority', 'due_date', 'source_id', 'tags')
        this.$refs.observer.reset();
        this.formData = Object.assign({}, initFrom, allowData)
        if (allowData.due_date) {
          this.datetime = parse(allowData.due_date, 'dd-MM-yyyy HH:mm', new Date())
        }
      }
    })
  },
  mounted () {
    this.fetchHelpers()
    this.fetchType()
    this.fetchSource()
  },
  watch: {
    'formData.type_id' (val) {
      if (val && typeof(val) === 'object' ) {
        this.formData.type_id = val.id
      }
    },
    'editor' (val) {
      if (val) {
        console.log('editor')
        this.formData.description = val
      }
    },
    'datetime' (val) {
      if (val) {
        this.formData.due_date = format(val, 'dd-MM-yyyy HH:mm')
      }
    },
  }

}
</script>
