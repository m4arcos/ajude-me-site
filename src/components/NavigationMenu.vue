<template>
  <v-list dense>
    <v-list-item link v-for="menu in menus" :key="menu.id"  @click="sendToRoute(menu.route)">
      <v-list-item-action>
        <v-icon>{{menu.icon}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
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
          icon: "fas fa-home",
          title: "Home"
        },
        {
          route: "ongs",
          icon: "mdi-account-group",
          title: "ONGs"
        },
        {
          route: "donations",
          icon: "fas fa-hand-holding-heart",
          title: "Quero ajudar"
        },
        {
          route: "needs",
          icon: "fas fa-hands",
          title: "Preciso de ajuda"
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