<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <donations-carousel
        :title="donations.title"
        :items="donations.items" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <donations-carousel
        :title="needsHelp.title"
        :items="needsHelp.items" />
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
      donations: {
        title: "Para doação",
        items: [
          {
            title: "Título 1",
            summary: "Estou disponível para doação",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
          {
            title: "Título 2",
            summary: "Estou disponível para doação",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
          {
            title: "Título 3",
            summary: "Estou disponível para doação",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
          {
            title: "Título 4",
            summary: "Estou disponível para doação",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
        ]
      },
      needsHelp: {
        title: "Preciso de ajuda",
        items: [
          {
            title: "Preciso de ajuda 1",
            summary: "Estou precisando de ajuda",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
          {
            title: "Preciso de ajuda 2",
            summary: "Estou precisando de ajuda",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
          {
            title: "Preciso de ajuda 3",
            summary: "Estou precisando de ajuda",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
          {
            title: "Preciso de ajuda 4",
            summary: "Estou precisando de ajuda",
            text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?"
          },
        ]
      },
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