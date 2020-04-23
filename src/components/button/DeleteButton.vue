<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn color="red" :disabled="disabled" small icon v-on="on" >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-trash-can-outline</v-icon>
          </template>
          <span>{{$t('actions.delete')}}</span>
        </v-tooltip>
      </v-btn>

    </template>

    <v-card>
      <v-card-text>
      <span class="red--text">{{$t('actions.warning_action_text')}}</span> <br>
      <small>{{$t('actions.warning_action_message')}}</small> <br>
      <b>{{message}}</b>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false">{{$t('actions.cancel')}}</v-btn>
        <v-btn color="primary" text @click="() => {
          menu = false
          $emit('click')
        }">
          {{$t('actions.apply')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'DeleteButton',
  props: [
    'disabled', 'message'
  ],
  data () {
    return {
      menu: false
    }
  }
}
</script>
