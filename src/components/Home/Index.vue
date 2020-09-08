<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home-index",
  components: {
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