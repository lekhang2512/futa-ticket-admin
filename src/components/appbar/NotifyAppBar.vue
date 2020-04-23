<template>
  <v-menu
    offset-y
    open-on-hover
    close-delay="100"
    allow-overflow
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon class="mr-6">
        <v-badge color="red" inline>
          <template v-slot:badge>
            <span>4</span>
          </template>
          <v-icon >mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-toolbar
      dense
    >
      <v-toolbar-title>Thông báo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click.prevent.stop="() => {}">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <span>{{$t('pages.app.show_notify_all')}}</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click.prevent.stop="() => {}">
            <v-icon>done_all</v-icon>
          </v-btn>
        </template>
        <span>{{$t('pages.app.check_notify_all')}}</span>
      </v-tooltip>

    </v-toolbar>

    <v-list
      three-line
      :max-width="425"
    >
      <v-list-item
        v-for="(item, index) in notifies"
        :key="index"
        @click="() => {}"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click.prevent.stop="() => {}">
                <v-icon>done</v-icon>
              </v-btn>
            </template>
            <span>{{$t('pages.app.check_notify')}}</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'NotifyAppBar',
  data: () => ({
    notifies: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
      },
    ]
  }),
}
</script>
