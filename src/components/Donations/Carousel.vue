<template>
  <v-sheet class="mx-auto" elevation="8" max-width="85%">
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-item v-for="n in 15" :key="n" v-slot:default="{ active, toggle }">
        <v-card
          :color="active ? 'light-green' : 'light-green lighten-1'"
          class="ma-4"
          height="200"
          width="300"
          @click="toggle"
        >
          <v-card-title class="headline font-weight-bold">Unlimited music now</v-card-title>

          <v-card-text
            class="text-left"
          >"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."</v-card-text>
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
          <h3 class="title">Selected {{ model }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    model: null,
  }),
};
</script>

<style scoped>
.headline {
  /* color: #ddd !important; */
}
</style>