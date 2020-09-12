<template>
  <v-sheet class="mx-auto" elevation="8" max-width="85%">
    <h4 class="headline text-left carousel-title">{{ title }}</h4>
    <v-slide-group v-model="model" class="pa-4 carousel-group" show-arrows>
      <v-slide-item v-for="item in items" :key="item.id" v-slot:default="{ active, toggle }">
        <v-card
          :color="active ? 'light-green' : 'light-green lighten-1'"
          class="ma-4"
          height="200"
          width="300"
          @click="toggle"
        >
          <v-card-title class="headline font-weight-bold">{{ item.title }}</v-card-title>

          <v-card-text
            class="text-left"
          >{{ item.summary }}</v-card-text>
          <v-card-actions>
            <v-btn class="font-weight-bold" text>Saiba mais...</v-btn>
          </v-card-actions>
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
        <v-row class="fill-height" align="center" justify="center">
          <h3 class="title carousel-text">Selected {{ items[model].text }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  name: "donations-carousel",
  props: {
    title: String,
    items: {}
  },
  data: () => ({
    model: null,
  }),
};
</script>

<style scoped>
.carousel-title {
  padding-left: 10px;
  padding-top: 10px;
}

.carousel-text {
  padding: 25px;
}

.carousel-group {
  padding-top: 5px !important;
}
</style>