<template>
  <v-list dense>
    <v-list-item link v-for="menu in menus" :key="menu.id">
      <v-list-item-action @click="sendToRoute(menu.route)">
        <v-icon>{{menu.icon}}</v-icon>
      </v-list-item-action>
      <v-list-item-content @click="sendToRoute(menu.route)">
        <v-list-item-title>{{menu.title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "navigation-menu",
  data() {
    return {
      menus: [
        {
          route: "home",
        //   icon: "mdi-home",
          icon: "fas fa-home",
          title: "Home"
        },
        {
          route: "donations",
          icon: "fas fa-heart",
          title: "Quero ajudar"
        },
        {
          route: "data-table",
          icon: "mdi-table",
          title: "ONGs"
        },
        {
          route: "data-table",
          icon: "mdi-table",
          title: "Quero ajudar!"
        },
        {
          route: "data-table",
          icon: "mdi-table",
          title: "Preciso de ajuda!"
        }
      ]
    };
  },
  methods: {
    sendToRoute(route) {
      this.$router.push({ name: route }).catch(()=>{});
    }
  }
};
</script>