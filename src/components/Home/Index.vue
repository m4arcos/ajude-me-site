<template>
  <v-container fluid>
    <v-row v-if="donations.items.length > 0" align="center" justify="center">
      <v-col cols="12">
        <donations-carousel
        :title="donations.title"
        :items="donations.items"
        :icon="donations.icon" />
      </v-col>
    </v-row>
    <v-row v-if="needsHelp.items.length > 0" align="center" justify="center">
      <v-col cols="12">
        <donations-carousel
        :title="needsHelp.title"
        :items="needsHelp.items"
        :icon="needsHelp.icon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DonationsCarousel from "../DonationsCarousel.vue";

export default {
  name: "home-index",
  components: {
    DonationsCarousel
  },
  data() {
    return {
      donations: {
        title: "Para doação",
        icon: "fas fa-hand-holding-heart",
        items: []
      },
      needsHelp: {
        title: "Preciso de ajuda",
        icon: "fas fa-hands",
        items: []
      },
    };
  },
  mounted() {
    this.$emit("update:pageTitle", "Ajude.me");
    this.getDonations();
    this.getNeedsHelp();
  },
  methods: {

    async getDonations() {
      try {
        const response = await fetch(
          "http://localhost:8080/mocks/donations.json"
        );

        const data = await response.json();

        this.donations.items = data.items;
      } catch (error) {
        console.log(error);
      }
    },

    async getNeedsHelp() {
      try {
        const response = await fetch(
          "http://localhost:8080/mocks/needs.json"
        );

        const data = await response.json();

        this.needsHelp.items = data.items;
      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>

<style scoped>
</style>