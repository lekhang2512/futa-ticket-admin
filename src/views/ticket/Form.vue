<template>
  <ValidationObserver v-slot="{ invalid, passes }" ref="observer">
    <v-form @submit.prevent="passes(submit)">
      <v-row dense>
        <!-- <v-col cols="12" sm="6">
          <ValidationProvider
            :name="$t('pages.ticket.project')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              name="bank_id"
              v-model="formData.bank_id"
              :items="banks"
              item-text="name"
              item-value="id"
              :label="$t('pages.ticket.project')"
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

        <!-- <v-col cols="12" md="6">
          <ValidationProvider
            :name="$t('pages.ticket.issue_type')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              name="bank_id"
              v-model="formData.bank_id"
              :items="banks"
              item-text="name"
              item-value="id"
              :label="$t('pages.ticket.issue_type')"
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

        <v-col cols="12">
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

        <v-col cols="12">
          <span>{{ $t('pages.ticket.description') }}</span>
          <tiny :id="`editor`" v-model="formData.description"></tiny>
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
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="formData.due_date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="formData.due_date"
                :label="$t('pages.ticket.due_date')"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.due_date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(formData.due_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12">
          <v-combobox
            multiple
            v-model="formData.tags"
            label="Tags"
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
// import { mapGetters, mapActions } from 'vuex'
// import { vnFilter } from '@/utils'
import Tiny from '@/components/Editor.vue'

const initFrom = {
  type_id: 1,
  name: '',
  description: '',
  priority: '',
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
      priority: [
        { name: 'Cao', code: 1 },
        { name: 'Trung bình', code: 2 },
        { name: 'Thấp', code: 3 },
      ],
      assignees: ['AnhBeta'],
      menu: false,
      search: ""
    }
  },
  computed: {
    // ...mapGetters('bank', ['banks', 'loadBank'])
  },
  methods: {
    // ...mapActions('bank', ['getBanks']),
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
    // fetchBanks () {
    //   if (!this.banks.length) {
    //     this.getBanks({
    //       query: { limit: -1 }
    //     })
    //   }
    // },
    // filterBank (item, queryText) {
    //   return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1 ||
    //   vnFilter(item.code.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    // },
  },
  created () {
    this.$on('init', (data) => {
      let allowData = (({ name, number, branch, branch_id }) => ({ name, number, branch, branch_id }))(data)
      this.$refs.observer.reset();
      this.formData = Object.assign({}, initFrom, allowData)
    })
  },
  mounted () {
    // this.fetchBanks()
  },
  watch: {
    // 'formData.bank_id' (val) {
    //   if (val && typeof(val) === 'object' ) {
    //     this.formData.bank_id = val.id
    //   }
    // }
  }

}
</script>
