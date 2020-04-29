<template>
  <ValidationObserver v-slot="{ invalid, passes }" ref="observer">
    <v-form @submit.prevent="passes(submit)">
      <v-row dense>
        <v-col cols="12" sm="6">
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

        <v-col cols="12" sm="6">
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
              return-object
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

        <v-col cols="12">
          <span>{{ $t('pages.ticket.description') }}</span>
          <tiny :id="`editor`" v-model="editor"></tiny>
        </v-col>


        <v-col cols="12" sm="4">
          <v-select
            v-model="formData.priority"
            :items="priority"
            item-text="name"
            item-value="code"
            :label="$t('pages.ticket.priority')"
            single-line
          ></v-select>
        </v-col>

        <v-col cols="12" sm="4">
          <v-select
            :items="assignees"
            :label="$t('pages.ticket.assignee')"
          ></v-select>
        </v-col>

        <!-- <v-col cols="12" sm="4">
          <ValidationProvider
            :name="$t('pages.ticket.assignee')"
            rules="required"
            v-slot="{ errors }"
            >
            <v-autocomplete
              name="bank_id"
              v-model="formData.bank_id"
              :items="banks"
              item-text="name"
              item-value="id"
              :label="$t('pages.ticket.assignee')"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              return-object
              :loading="loadBank"
              :filter="filterBank"
              clearable
              clear-icon="close"
              class="input-required"
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.name }} - {{ data.item.code }}
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content v-if="!$vuetify.breakpoint.xsOnly">
                    <v-list-item-title>{{data.item.name}} - {{data.item.code}}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-content v-else>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.code"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>

            </v-autocomplete>
          </ValidationProvider>
        </v-col> -->

        <v-col cols="12" sm="4">
          <v-datetime-picker
            v-model="datetime"
            :text-field-props="textFieldProps"
            time-format="HH:mm"
            data-format="yyyy-MM-dd"
            />
        </v-col>

        <v-col cols="12">
          <v-combobox
            multiple
            v-model="formData.tags"
            :label="$t('pages.ticket.tag')"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags">
          </v-combobox>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-end">
            <button-submit
              small
              :text="$t('pages.common.button_create')"
              :disabled="invalid"
              :dark="!invalid"
              :loading="btnLoading"
              @click="passes(submit)"/>
          </div>
        </v-col>
      </v-row>
    </v-form>
  {{ formData }}
  </ValidationObserver>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { vnFilter } from '@/utils'
import Tiny from '@/components/Editor.vue'
import { format } from 'date-fns'

const initFrom = {
  type_id: 1,
  name: '',
  description: '',
  priority: 2,
  due_date: '',
  tags: ['AnhBeta', 'EmBeta']
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
      editor: '',
      priority: [
        { name: 'Cao', code: 1 },
        { name: 'Trung bình', code: 2 },
        { name: 'Thấp', code: 3 },
      ],
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
    // ...mapGetters('bank', ['banks', 'loadBank'])
  },
  methods: {
    ...mapActions('ticketType', ['getByQuery']),
    submit () {
      this.$emit('submit', this.formData)
    },
    updateTags() {
      // this.$nextTick(() => {
      //   this.tags.push(...this.search.split(","))
      //   this.$nextTick(() => {
      //     this.search = "";
      //   });
      // });
    },
    fetchType () {
      if (!this.ticketTypes.length) {
        this.getByQuery({
          query: { limit: -1 }
        })
      }
    },
    filterType (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    },
  },
  created () {
    this.$on('init', (data) => {
      let allowData = (({ name, type_id, description, priority, due_date, tags }) => ({ name, type_id, description, priority, due_date, tags }))(data)
      this.$refs.observer.reset();
      this.formData = Object.assign({}, initFrom, allowData)
      this.datetime = ''
    })
  },
  mounted () {
    this.fetchType()
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
        this.formData.due_date = format(val, 'yyyy-MM-dd HH:mm')
      }
    },
  }

}
</script>
