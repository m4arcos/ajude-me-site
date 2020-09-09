<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <donations-carousel></donations-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DonationsCarousel from "../Donations/Carousel.vue";

export default {
  name: "home-index",
  components: {
    DonationsCarousel
  },
  data() {
    return {
    };
  },
  mounted() {
    this.$emit("update:pageTitle", "Ajude.me");
  },
  methods: {
  },
};
</script>

<style scoped>
</style>