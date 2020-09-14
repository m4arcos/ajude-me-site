<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <donations-carousel
          :loading="loadingDonations"
          :isDonation="true"
          :title="donations.title"
          :items="donations.items"
          :icon="donations.icon"
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <donations-carousel
          :loading="loadingNeeds"
          :isDonation="false"
          :title="needsHelp.title"
          :items="needsHelp.items"
          :icon="needsHelp.icon"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DonationsCarousel from "../DonationsCarousel.vue";
import config from "../../configs/api";

export default {
  name: "home-index",
  components: {
    DonationsCarousel,
  },
  data() {
    return {
      donations: {
        title: "Para doação",
        icon: "fas fa-hand-holding-heart",
        items: [],
      },
      needsHelp: {
        title: "Preciso de ajuda",
        icon: "fas fa-hands",
        items: [],
      },
      loadingDonations: false,
      loadingNeeds: false,
    };
  },
  mounted() {
    this.$emit("update:pageTitle", "Ajude.me");
    this.getDonations();
    this.getNeedsHelp();
  },
  methods: {
    async getDonations() {
      this.loadingDonations = true;
      try {
        let apiAddress = config.address + "/donations";

        const response = await fetch(apiAddress);

        const data = await response.json();

        this.donations.items = data.items;
        this.loadingDonations = false;
      } catch (error) {
        this.loadingDonations = false;
        console.log(error);
      }
    },

    async getNeedsHelp() {
      this.loadingNeeds = true;
      try {
        let apiAddress = config.address + "/needs";

        const response = await fetch(apiAddress);

        const data = await response.json();

        this.needsHelp.items = data.items;
        this.loadingNeeds = false;
      } catch (error) {
        console.log(error);
        this.loadingNeeds = false;
      }
    },
  },
};
</script>

<style scoped>
</style>