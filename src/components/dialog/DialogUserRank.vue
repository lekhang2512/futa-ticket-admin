<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
    >
    <v-card>
      <v-card-title
        class="pa-0 title justify-center font-weight-bold dialog-title"
        primary-title
        >
        {{$t('pages.app.user_rank')}}
        <v-btn text icon @click="dialog = false" class="dialog-close">
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="pa-5 body-2 dialog-content">
        <p class="font-weight-bold mb-1">1. {{$t('dialogs.user_rank.rule')}}</p>
        <p class="mb-2">{{$t('dialogs.user_rank.form')}}:</p>
        <p class="primary--text total-rating text-center">
          {{$t('dialogs.user_rank.total_rating_money')}} = {{$t('dialogs.user_rank.transport_fee')}} + {{$t('dialogs.user_rank.service_fee')}} + {{$t('dialogs.user_rank.wood_bale_fee')}} + {{$t('dialogs.user_rank.counting_fee')}} + {{$t('dialogs.user_rank.insurance_fee')}}
        </p>
        <p class="font-weight-bold mb-1">2. {{$t('dialogs.user_rank.progress_cumulative')}}</p>
        <p class="mb-3">{{$t('dialogs.user_rank.your_current_point')}}:</p>
        <div class="primary--text d-flex justify-center align-center your-current-point mb-3">
          <span class="font-weight-bold">320.000.000 / 810.000.000</span><span class="ml-1">(39.5%)</span>
        </div>
        <p class="mb-3">{{$t('dialogs.user_rank.current_user_rank')}}:</p>
        <v-flex class="mb-5 d-flex justify-center" v-if="user.level">
          <img
            v-for="n in user.level"
            :key="n"
            width="32"
            :src="user.level_icon"
            class="mx-2"
          >
        </v-flex>
        <p class="mb-5 text-center font-weight-bold" v-else>{{$t('pages.app.no_rank')}}</p>
        <p class="font-weight-bold mb-1">3. {{$t('dialogs.user_rank.benefit')}}</p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th width="60" class="text-left table-th">{{$t('dialogs.user_rank.rank')}}</th>
                <th width="80" class="text-left table-th">{{$t('dialogs.user_rank.condition')}}</th>
                <th class="text-left table-th">{{$t('dialogs.user_rank.benefit')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-end"><img class="mr-2" src="../../assets/images/crown.svg"> x 1</div>
                </td>
                <td class="table-td caption">≥ 10 {{$t('dialogs.user_rank.million')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 80% + {{$t('dialogs.user_rank.service_fee_discount')}} 5%</td>
              </tr>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-end"><img class="mr-2" src="../../assets/images/crown.svg"> x 2</div>
                </td>
                <td class="table-td caption">≥ 30 {{$t('dialogs.user_rank.million')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 75% + {{$t('dialogs.user_rank.service_fee_discount')}} 7%</td>
              </tr>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-end"><img class="mr-2" src="../../assets/images/crown.svg"> x 3</div>
                </td>
                <td class="table-td caption">≥ 90 {{$t('dialogs.user_rank.million')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 70% + {{$t('dialogs.user_rank.discount_shipping')}} 5% + {{$t('dialogs.user_rank.service_fee_discount')}} 10%</td>
              </tr>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-end"><img class="mr-2" src="../../assets/images/crown.svg"> x 4</div>
                </td>
                <td class="table-td caption">≥ 270 {{$t('dialogs.user_rank.million')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 65% + {{$t('dialogs.user_rank.discount_shipping')}} 7% + {{$t('dialogs.user_rank.service_fee_discount')}} 15% + {{$t('dialogs.user_rank.credit_limit')}} 3 {{$t('dialogs.user_rank.million')}}</td>
              </tr>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-end"><img class="mr-2" src="../../assets/images/crown.svg"> x 5</div>
                </td>
                <td class="table-td caption">≥ 810 {{$t('dialogs.user_rank.million')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 60% + {{$t('dialogs.user_rank.discount_shipping')}} 10% + {{$t('dialogs.user_rank.service_fee_discount')}} 20% + {{$t('dialogs.user_rank.credit_limit')}} 5 {{$t('dialogs.user_rank.million')}}</td>
              </tr>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-center"><img class="mr-1" src="../../assets/images/diamond.svg"> x 1</div>
                </td>
                <td class="table-td caption">≥ 2.43 {{$t('dialogs.user_rank.billion')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 50% + {{$t('dialogs.user_rank.discount_shipping')}} 12% + {{$t('dialogs.user_rank.service_fee_discount')}} 25% + {{$t('dialogs.user_rank.credit_limit')}} 10 {{$t('dialogs.user_rank.million')}}</td>
              </tr>
              <tr>
                <td class="table-td">
                  <div class="d-flex align-center"><img class="mr-1" src="../../assets/images/diamond.svg"> x 2</div>
                </td>
                <td class="table-td caption">≥ 7.29 {{$t('dialogs.user_rank.billion')}}</td>
                <td class="table-td caption">{{$t('dialogs.user_rank.deposit')}} 40% + {{$t('dialogs.user_rank.discount_shipping')}} 15% + {{$t('dialogs.user_rank.service_fee_discount')}} 30% + {{$t('dialogs.user_rank.credit_limit')}} 15 {{$t('dialogs.user_rank.million')}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    name: 'DialogUserRank',

    data () {
      return {
        dialog: false
      }
    },

    computed: {
      ...mapGetters('auth', ['user'])
    },

    props: ['value'],

    mounted () {
      this.dialog = this.value
    },

    watch: {
      value: function () {
        this.dialog = this.value
      },
      dialog: function () {
        this.$emit('input', this.dialog)
      }
    }
  }
</script>

<style lang="css" scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
  .dialog-title {
    font-size: 18px !important;
    height: 54px;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
  }
  .dialog-content {
  }
  .total-rating {
    font-family: 'Roboto Slab', serif;
  }
  .your-current-point {
    border: 1px solid #DEDEDE;
    border-radius: 100px;
    margin: 0 30px;
    height: 28px;
  }
  .table-th {
    padding: 10px 0;
    height: auto;
  }
  .table-td {
    padding: 10px 0;
    height: auto;
  }
</style>
